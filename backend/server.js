import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { performOcr } from './services/ocrService.js';
import { retrieveGroundedContext, formatGroundedContextForPrompt } from './services/ragService.js';
import { simplifyDocumentWithGemini } from './services/llmService.js';
import { synthesizeSpeech } from './services/ttsService.js';
import { documentCache } from './services/cacheService.js';
import {
  initializeDatabase,
  registerUser,
  authenticateUser,
  saveDocumentRecord,
  getUserDocuments,
  getDbStatus
} from './services/dbService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup: allow local frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '15mb' }));

// Multer setup with strict 10MB limit and image-only validation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB strict limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype) || file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
      cb(null, true);
    } else {
      const err = new Error('Invalid file type. Please upload a clear document photo, scan, or PDF file (JPG, PNG, WebP, PDF).');
      err.isUserFacing = true;
      err.statusCode = 400;
      cb(err, false);
    }
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  const googleCloudConfigured = Boolean(process.env.GOOGLE_CLOUD_API_KEY && process.env.GOOGLE_CLOUD_API_KEY !== 'your_google_cloud_api_key_here');

  res.json({
    status: 'online',
    service: 'Hmm Backend Proxy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    apiKeys: {
      geminiConfigured,
      googleCloudConfigured,
      fallbackMode: process.env.FALLBACK_MODE !== 'false'
    },
    database: getDbStatus()
  });
});

/**
 * User Authentication Endpoints (MySQL)
 */
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email address, and password are required.'
      });
    }

    const user = await registerUser(name, email, password);
    res.json({
      success: true,
      user,
      message: 'Account created successfully in MySQL.'
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email address and password are required.'
      });
    }

    const user = await authenticateUser(email, password);
    res.json({
      success: true,
      user,
      message: 'Logged in successfully.'
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * User Document History Endpoint (MySQL)
 */
app.get('/api/documents/history', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId query parameter is required.' });
    }
    const docs = await getUserDocuments(userId);
    res.json({
      success: true,
      count: docs.length,
      documents: docs
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Knowledge Base list endpoint
 */
app.get('/api/knowledge-base', async (req, res) => {
  try {
    const sampleResults = await retrieveGroundedContext('income tax notice', 15);
    res.json({
      success: true,
      count: sampleResults.length,
      documents: sampleResults.map(r => ({
        title: r.title,
        category: r.category,
        citation: r.citation
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Main Pipeline Endpoint:
 * POST /api/process-document
 * Expects multipart form-data with:
 * - image (File)
 * - language (String, e.g. 'ta', 'hi', 'en')
 * - userId (Optional, number)
 */
app.post('/api/process-document', upload.single('image'), async (req, res) => {
  const startTime = Date.now();

  try {
    // 1. Validation
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image or PDF of the document you want to simplify.'
      });
    }

    const targetLang = req.body.language || 'en';
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype || 'image/jpeg';

    console.log(`[Process Request] File: ${req.file.originalname} (${(fileBuffer.length / 1024).toFixed(1)} KB, ${mimeType}), Lang: ${targetLang}`);

    // 2. Cache check
    const cacheKey = documentCache.generateKey(fileBuffer, targetLang);
    const cachedResponse = documentCache.get(cacheKey);
    if (cachedResponse) {
      console.log(`[Cache Hit] Serving cached document result in ${Date.now() - startTime}ms`);
      return res.json({
        ...cachedResponse,
        fromCache: true,
        processingTimeMs: Date.now() - startTime
      });
    }

    // 3. Step 1: OCR / Document Ingestion (Images via Vision/Sharp or Native PDF via Gemini Flash)
    console.log(`[Pipeline 1/4] Running Document Extraction (${mimeType})...`);
    const ocrResult = await performOcr(fileBuffer, targetLang, mimeType);

    // 4. Step 2: RAG Grounding Search
    console.log('[Pipeline 2/4] Retrieving grounded statutory & clinical reference chunks...');
    const groundedSources = await retrieveGroundedContext(ocrResult.rawText, 3);
    const groundedPromptContext = formatGroundedContextForPrompt(groundedSources);

    // 5. Step 3: LLM Simplification with Gemini structured JSON
    console.log('[Pipeline 3/4] Calling Gemini 1.5 Flash structured simplification...');
    const llmResult = await simplifyDocumentWithGemini(ocrResult.rawText, targetLang, groundedPromptContext);

    // 6. Step 4: TTS with Cloud Text-to-Speech (SSML pauses + natural voice)
    console.log('[Pipeline 4/4] Generating natural speech audio with Cloud TTS...');
    const audioBase64 = await synthesizeSpeech(llmResult.summary, targetLang);

    // 7. Save document record to MySQL if database is connected
    let savedDocId = null;
    try {
      const parsedUserId = req.body.userId ? Number(req.body.userId) : null;
      savedDocId = await saveDocumentRecord({
        userId: parsedUserId,
        filename: req.file.originalname || 'document.jpg',
        documentType: llmResult.documentType,
        language: targetLang,
        summary: llmResult.summary,
        keyFacts: llmResult.keyFacts,
        nextSteps: llmResult.nextSteps,
        urgency: llmResult.urgency,
        groundedReference: llmResult.groundedReference
      });
    } catch (saveErr) {
      console.warn('[MySQL Save Record Notice]:', saveErr.message);
    }

    const fullResponse = {
      success: true,
      documentId: savedDocId,
      documentType: llmResult.documentType,
      summary: llmResult.summary,
      keyFacts: llmResult.keyFacts,
      nextSteps: llmResult.nextSteps,
      urgency: llmResult.urgency,
      groundedReference: llmResult.groundedReference,
      groundedSources: groundedSources.map(s => ({
        title: s.title,
        category: s.category,
        citation: s.citation,
        score: s.score
      })),
      audioBase64: audioBase64 || null,
      ocrConfidence: ocrResult.confidence,
      language: targetLang,
      processingTimeMs: Date.now() - startTime
    };

    // Cache the completed result
    documentCache.set(cacheKey, fullResponse);

    console.log(`[Process Complete] Succeeded in ${Date.now() - startTime}ms`);
    return res.json(fullResponse);

  } catch (err) {
    console.error('[Pipeline Error]', err);

    const statusCode = err.statusCode || (err.isUserFacing ? 400 : 500);
    const message = err.isUserFacing
      ? err.message
      : 'We ran into an unexpected issue reading this document. Please check the image lighting and try again.';

    return res.status(statusCode).json({
      success: false,
      error: message
    });
  }
});

// Multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'The uploaded file exceeds the 10MB limit. Please upload a compressed or standard smartphone photo.'
      });
    }
    return res.status(400).json({
      success: false,
      error: `File upload error: ${err.message}`
    });
  }

  if (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({
      success: false,
      error: err.message || 'An internal server error occurred.'
    });
  }

  next();
});

// Start listening & initialize database
app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`🚀 Hmm Backend Proxy running on http://localhost:${PORT}`);
  console.log(`   OCR + LLM + RAG + TTS Pipeline Active`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log('====================================================');

  // Initialize MySQL connection and tables
  await initializeDatabase();
});
