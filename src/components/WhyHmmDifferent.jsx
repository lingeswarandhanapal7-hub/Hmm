import React from 'react';
import { Layers, Headphones, BookOpenCheck } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: Layers,
    title: 'Legal, medical, and municipal in one place',
    description:
      'Most tools specialize in only contracts or only medical summaries. Real households receive property re-assessments, blood test markers, and medication schedules all in the same week. Hmm handles all three domains under one unified experience.'
  },
  {
    icon: Headphones,
    title: 'Spoken aloud, not just translated text',
    description:
      'Translating English jargon into dense written regional text still leaves low-literacy elders struggling. Hmm generates clear voice audio in Tamil, Hindi, and more, matching conversational cadences so the whole family can listen together.'
  },
  {
    icon: BookOpenCheck,
    title: 'Action cards grounded in real sourced rules',
    description:
      'Generic AI models hallucinate deadline dates or make dangerous dosage guesses. Hmm retrieves and references the exact statutory provisions, municipal amnesty bylaws, or clinical guidelines before outputting any checklist item.'
  }
];

export default function WhyHmmDifferent() {
  return (
    <section className="why-hmm-section" id="why-hmm" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-header">
          <div className="section-kicker">
            <span>Core Principles</span>
          </div>
          <h2 id="why-heading" className="why-title">
            Built for how real families solve problems.
          </h2>
          <p className="why-subtitle">
            Three disciplined design choices that separate Hmm from generic document parsers.
          </p>
        </div>

        <div className="why-grid">
          {DIFFERENTIATORS.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div key={idx} className="why-card paper-sheet">
                <div className="why-card-icon-wrap" aria-hidden="true">
                  <Icon size={22} className="why-card-icon" />
                </div>
                <h3 className="why-card-title">{diff.title}</h3>
                <p className="why-card-desc">{diff.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
