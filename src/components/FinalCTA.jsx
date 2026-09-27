import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="final-cta-section" aria-label="Call to action">
      <div className="container">
        <div className="final-cta-band">
          <div className="final-cta-content">
            <h2 className="final-cta-title">
              Turn your next confusing letter into immediate clarity.
            </h2>
            <p className="final-cta-subtitle">
              Hmm turns confusing government notices, medical reports, and prescriptions into
              plain language you can read or hear — in your own language.
            </p>
          </div>

          <div className="final-cta-action">
            <a href="#try-hmm" className="final-cta-button">
              <FileText size={18} />
              <span>Try it with a document</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
