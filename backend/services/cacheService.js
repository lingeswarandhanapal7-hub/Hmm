import crypto from 'crypto';

class ResponseCache {
  constructor(maxSize = 100, ttlMs = 1000 * 60 * 60 * 2) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  /**
   * Generates a SHA-256 hash key from image buffer and language code
   */
  generateKey(buffer, langCode) {
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    hash.update(Buffer.from(langCode || 'en'));
    return hash.digest('hex');
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key, value) {
    // Evict oldest if limit reached
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttlMs
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const documentCache = new ResponseCache();
