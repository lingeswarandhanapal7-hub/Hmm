import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../data/embeddings.json');

let cachedIndex = null;

/**
 * Loads the pre-computed embeddings index
 */
function loadIndex() {
  if (cachedIndex) return cachedIndex;

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      cachedIndex = JSON.parse(raw);
      console.log(`[RAG Service] Loaded ${cachedIndex.chunks?.length || 0} knowledge vectors from index.`);
      return cachedIndex;
    } catch (e) {
      console.warn('[RAG Service] Error reading embeddings.json:', e.message);
    }
  }

  return { chunks: [] };
}

/**
 * Computes cosine similarity between two numeric arrays
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Computes a lexical keyword score between query and chunk
 */
function lexicalScore(queryWords, chunkText) {
  const textLower = chunkText.toLowerCase();
  let matches = 0;
  for (const w of queryWords) {
    if (w.length > 2 && textLower.includes(w)) {
      matches += (w.length > 5 ? 1.5 : 1.0);
    }
  }
  return matches / (queryWords.length + 1);
}

/**
 * Generates an embedding vector for the search query
 */
async function embedQuery(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (err) {
      console.warn('[RAG Service] Gemini embedding API error, falling back to local vector:', err.message);
    }
  }

  // Local synthetic vector
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

  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map(v => v / norm);
}

/**
 * Searches the knowledge base using hybrid vector + lexical retrieval
 * 
 * @param {string} queryText - The text to find grounding for (e.g. summary or OCR text)
 * @param {number} topK - Number of results to return (default 3)
 * @returns {Promise<Array<{ title: string, category: string, citation: string, text: string, score: number }>>}
 */
export async function retrieveGroundedContext(queryText, topK = 3) {
  const index = loadIndex();
  if (!index.chunks || index.chunks.length === 0) {
    return [];
  }

  const queryVector = await embedQuery(queryText);
  const queryWords = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);

  const scoredChunks = index.chunks.map(chunk => {
    const vectorSim = cosineSimilarity(queryVector, chunk.embedding);
    const lexSim = lexicalScore(queryWords, `${chunk.title} ${chunk.text} ${chunk.citation}`);
    
    // Hybrid score: 70% vector semantic similarity + 30% exact term matching
    const combinedScore = (0.7 * vectorSim) + (0.3 * Math.min(1.0, lexSim));

    return {
      title: chunk.title,
      category: chunk.category,
      citation: chunk.citation,
      text: chunk.text,
      score: Math.round(combinedScore * 1000) / 1000
    };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, topK);
}

/**
 * Formats retrieved chunks into clean markdown for Gemini system/prompt injection
 */
export function formatGroundedContextForPrompt(matchedChunks) {
  if (!matchedChunks || matchedChunks.length === 0) {
    return 'No specific statutory knowledge base match found.';
  }

  return matchedChunks.map((chunk, index) => {
    return `### Source ${index + 1}: ${chunk.title}
- Category: ${chunk.category}
- Legal / Clinical Authority: ${chunk.citation || 'Verified Guideline'}
- Reference Content:
${chunk.text.trim()}
`;
  }).join('\n\n');
}
