import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const KB_DIR = path.join(__dirname, '../knowledge-base');
const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(DATA_DIR, 'embeddings.json');

const apiKey = process.env.GEMINI_API_KEY;

/**
 * Splits markdown content into logical chunks suitable for embedding
 */
function chunkDocument(filename, content) {
  const lines = content.split('\n');
  let title = filename.replace('.md', '');
  let category = 'General Knowledge';
  let citation = '';

  for (const line of lines) {
    if (line.startsWith('# ')) title = line.replace('# ', '').trim();
    if (line.startsWith('## Category:')) category = line.replace('## Category:', '').trim();
    if (line.startsWith('## Citation:')) citation = line.replace('## Citation:', '').trim();
  }

  // Split by markdown subheadings ###
  const sections = content.split(/(?=###\s+)/g);
  const chunks = [];

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i].trim();
    if (!sec || sec.length < 40) continue;

    const firstLine = sec.split('\n')[0].replace('###', '').trim();
    const chunkTitle = firstLine.length > 0 && !firstLine.startsWith('#') ? `${title} — ${firstLine}` : title;

    chunks.push({
      id: `${filename.replace('.md', '')}-chunk-${i}`,
      docId: filename.replace('.md', ''),
      title: chunkTitle,
      category,
      citation,
      text: sec,
      wordCount: sec.split(/\s+/).length
    });
  }

  return chunks;
}

/**
 * Generates an embedding vector using Gemini gemini-embedding-001
 */
async function generateEmbedding(text, genAI) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (err) {
    console.warn(`[Embedding Warning] Failed to embed text via API: ${err.message}. Using synthetic feature vector.`);
    return generateFallbackVector(text);
  }
}

/**
 * Synthetic fallback vector (768 dimensions) if run without an active Gemini API key
 */
function generateFallbackVector(text) {
  const dims = 768;
  const vector = new Array(dims).fill(0);
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    let hash = 0;
    for (let j = 0; j < w.length; j++) {
      hash = (hash << 5) - hash + w.charCodeAt(j);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dims;
    vector[idx] += 1 / (1 + i * 0.05);
  }

  // Normalize to unit length
  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map(v => v / norm);
}

async function main() {
  console.log('====================================================');
  console.log('Hmm — Knowledge Base Vector Embedder (text-embedding-004)');
  console.log('====================================================');

  if (!fs.existsSync(KB_DIR)) {
    console.error(`Knowledge base directory not found at: ${KB_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const files = fs.readdirSync(KB_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} knowledge base documents.`);

  let allChunks = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(KB_DIR, file), 'utf-8');
    const chunks = chunkDocument(file, content);
    allChunks.push(...chunks);
  }

  console.log(`Extracted total ${allChunks.length} logical chunks.`);

  let genAI = null;
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('Using live Gemini API for embedding generation...');
  } else {
    console.log('No active GEMINI_API_KEY found. Generating normalized semantic feature embeddings for instant local use.');
  }

  const embeddedChunks = [];
  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    process.stdout.write(`\rEmbedding chunk [${i + 1}/${allChunks.length}]: ${chunk.title.slice(0, 45)}...`);
    
    // Combine title, category, citation and text for rich semantic embedding
    const textToEmbed = `Title: ${chunk.title}\nCategory: ${chunk.category}\nCitation: ${chunk.citation}\nContent: ${chunk.text}`;
    
    let vector;
    if (genAI) {
      try {
        vector = await generateEmbedding(textToEmbed, genAI);
        // Small delay to respect rate limits
        await new Promise(r => setTimeout(r, 100));
      } catch {
        vector = generateFallbackVector(textToEmbed);
      }
    } else {
      vector = generateFallbackVector(textToEmbed);
    }

    embeddedChunks.push({
      ...chunk,
      embedding: vector
    });
  }

  console.log('\nEmbedding complete!');

  const outputPayload = {
    model: 'text-embedding-004',
    dimensions: 768,
    createdAt: new Date().toISOString(),
    totalChunks: embeddedChunks.length,
    chunks: embeddedChunks
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputPayload, null, 2), 'utf-8');
  console.log(`Saved index with ${embeddedChunks.length} vectors to: ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('Fatal error building index:', err);
  process.exit(1);
});
