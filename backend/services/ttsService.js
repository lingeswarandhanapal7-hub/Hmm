/**
 * Voice configurations for Google Cloud Text-to-Speech by language code
 */
const TTS_VOICE_CONFIG = {
  ta: { languageCode: 'ta-IN', name: 'ta-IN-Standard-A', ssmlGender: 'FEMALE' },
  hi: { languageCode: 'hi-IN', name: 'hi-IN-Standard-A', ssmlGender: 'FEMALE' },
  te: { languageCode: 'te-IN', name: 'te-IN-Standard-A', ssmlGender: 'FEMALE' },
  kn: { languageCode: 'kn-IN', name: 'kn-IN-Standard-A', ssmlGender: 'FEMALE' },
  bn: { languageCode: 'bn-IN', name: 'bn-IN-Standard-A', ssmlGender: 'FEMALE' },
  mr: { languageCode: 'mr-IN', name: 'mr-IN-Standard-A', ssmlGender: 'FEMALE' },
  ml: { languageCode: 'ml-IN', name: 'ml-IN-Standard-A', ssmlGender: 'FEMALE' },
  en: { languageCode: 'en-IN', name: 'en-IN-Standard-A', ssmlGender: 'FEMALE' }
};

/**
 * Escapes characters for valid XML/SSML
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Converts plain summary text into human-paced SSML with natural breathing pauses
 */
function buildNaturalSsml(text) {
  const clean = text.replace(/<[^>]*>/g, '').trim();

  // Split into sentences across Latin and Indic scripts (. ! ? । \n)
  const rawSentences = clean.split(/([.!?।\n]+)/);
  const sentences = [];
  
  for (let i = 0; i < rawSentences.length; i += 2) {
    const sent = rawSentences[i]?.trim();
    const punct = rawSentences[i + 1]?.trim() || '';
    if (sent && sent.length > 0) {
      sentences.push(sent + (punct ? ` ${punct}` : ''));
    }
  }

  const ssmlParts = sentences.map(s => `<s>${escapeXml(s)}</s><break time="450ms"/>`);
  return `<speak><prosody rate="0.95" pitch="+0st">${ssmlParts.join('\n')}</prosody></speak>`;
}

/**
 * Zero-Billing Free Google TTS provider (Requires NO credit card and NO auto-pay!)
 */
async function synthesizeFreeGoogleTts(text, langCode) {
  try {
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    // Cap chunk to ~190 chars for standard single-pass TTS synthesis
    const shortText = cleanText.length > 200 ? cleanText.slice(0, 195) : cleanText;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(shortText)}&tl=${langCode}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer).toString('base64');
    }
  } catch (err) {
    console.warn('[Free TTS Service Notice]:', err.message);
  }
  return null;
}

/**
 * Synthesizes natural regional speech.
 * Tries Google Cloud TTS first if key is configured, and automatically switches
 * to zero-billing free TTS or client Web Speech API if Google Cloud autopay is not enabled.
 * 
 * @param {string} text - The summary text to speak
 * @param {string} langCode - Language code ('ta', 'hi', etc.)
 * @returns {Promise<string|null>} - Base64 encoded MP3 audio or null if unavailable
 */
export async function synthesizeSpeech(text, langCode = 'en') {
  if (!text || text.trim().length === 0) {
    return null;
  }

  const cloudApiKey = process.env.GOOGLE_CLOUD_API_KEY;

  // 1. Try Google Cloud TTS if an active Cloud API Key is supplied
  if (cloudApiKey && cloudApiKey !== 'your_google_cloud_api_key_here') {
    const voice = TTS_VOICE_CONFIG[langCode] || TTS_VOICE_CONFIG.en;
    const ssml = buildNaturalSsml(text);
    const ttsEndpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${cloudApiKey}`;

    try {
      const response = await fetch(ttsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { ssml },
          voice: {
            languageCode: voice.languageCode,
            name: voice.name,
            ssmlGender: voice.ssmlGender
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.95,
            pitch: 0.0
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioContent) {
          return data.audioContent;
        }
      } else {
        console.warn(`[Cloud TTS Notice] Status ${response.status}. Switching to zero-billing TTS engine.`);
      }
    } catch (cloudErr) {
      console.warn('[Cloud TTS Error]:', cloudErr.message);
    }
  }

  // 2. Zero-Billing Free Google TTS (No autopay, no credit card needed!)
  const freeTtsAudio = await synthesizeFreeGoogleTts(text, langCode);
  if (freeTtsAudio) {
    return freeTtsAudio;
  }

  // 3. If null, the frontend automatically uses the built-in browser SpeechSynthesis engine
  return null;
}
