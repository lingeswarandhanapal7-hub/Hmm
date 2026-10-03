/**
 * API Configuration
 * Supports environment variable VITE_API_URL for production deployment,
 * defaulting to local development proxy on http://localhost:3001
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  PROCESS_DOCUMENT: `${API_BASE_URL}/api/process-document`,
  DOCUMENT_HISTORY: `${API_BASE_URL}/api/documents/history`,
  KNOWLEDGE_BASE: `${API_BASE_URL}/api/knowledge-base`,
};
