import React, { useState } from 'react';
import { Volume2, Globe2 } from 'lucide-react';
import { ALL_SUPPORTED_LANGUAGES } from '../data/mockData';

export default function SupportedLanguages() {
  const defaultLang = ALL_SUPPORTED_LANGUAGES.find((l) => l.id === 'en') || ALL_SUPPORTED_LANGUAGES[0];
  const [activeLang, setActiveLang] = useState(defaultLang);

  const handleSpeakPhrase = (lang) => {
    setActiveLang(lang);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lang.phrase);
      const langCodeMap = {
        en: 'en-US',
        ta: 'ta-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        ml: 'ml-IN',
        gu: 'gu-IN',
        pa: 'pa-IN',
        or: 'or-IN',
        as: 'as-IN'
      };
      utterance.lang = langCodeMap[lang.id] || 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="languages-section" id="languages" aria-labelledby="languages-heading">
      <div className="container">
        <div className="languages-header">
          <div className="section-kicker">
            <span>Universal Regional Access</span>
          </div>
          <h2 id="languages-heading" className="languages-title">
            Documents explained in the language spoken in your home.
          </h2>
          <p className="languages-subtitle">
            Every regional script is rendered in its native typographical family — never falling back to
            generic system fonts that obscure ligatures and character shapes.
          </p>
        </div>

        {/* Wrapped Row of Language Chips */}
        <div className="languages-chips-wrapper" role="list">
          {ALL_SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = activeLang.id === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                className={`language-showcase-chip ${isSelected ? 'language-showcase-chip--active' : ''}`}
                onClick={() => handleSpeakPhrase(lang)}
                role="listitem"
                aria-label={`Language: ${lang.name} (${lang.native})`}
              >
                <span className="lang-chip-native">{lang.native}</span>
                <span className="lang-chip-name">{lang.name}</span>
                <span className="lang-chip-speakers">{lang.speakers}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Language Highlight Card */}
        <div className="language-preview-callout paper-sheet">
          <div className="lang-callout-header">
            <div className="lang-callout-meta">
              <span className="rubber-stamp">VERIFIED SCRIPT</span>
              <span className="lang-callout-name">{activeLang.name} — {activeLang.native}</span>
            </div>
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => handleSpeakPhrase(activeLang)}
              title="Hear phrase spoken"
            >
              <Volume2 size={15} />
              <span>Hear pronunciation</span>
            </button>
          </div>

          <div className="lang-callout-quote-box">
            <span className="lang-callout-quote">“{activeLang.phrase}”</span>
            <span className="lang-callout-meaning">
              {activeLang.id === 'en' ? '(Clear, plain conversational English)' : '(Meaning: “Oh. Now I get it.”)'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
