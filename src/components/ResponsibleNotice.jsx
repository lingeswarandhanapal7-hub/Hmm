import React from 'react';
import { ShieldCheck, Scale, Stethoscope } from 'lucide-react';

export default function ResponsibleNotice() {
  return (
    <section className="responsible-section" aria-label="Responsible use notice">
      <div className="container">
        <div className="responsible-callout paper-sheet">
          <div className="responsible-callout__icon-strip">
            <div className="responsible-icon-circle">
              <ShieldCheck size={26} className="responsible-shield" />
            </div>
            <span className="rubber-stamp">RESPONSIBLE BY DESIGN</span>
          </div>

          <div className="responsible-callout__content">
            <h3 className="responsible-title">
              Our pledge on medical and legal boundaries
            </h3>
            <p className="responsible-text">
              <strong>
                Hmm explains what a document says and flags what deserves a professional's attention.
                It does not diagnose, prescribe, or give legal advice — always confirm important decisions
                with a doctor, lawyer, or the relevant authority.
              </strong>
            </p>
            <div className="responsible-pillars">
              <div className="responsible-pillar-item">
                <Stethoscope size={16} />
                <span>
                  <strong>Clinical decisions:</strong> Reports flag abnormal values so you can prepare for your doctor visit with the right questions.
                </span>
              </div>
              <div className="responsible-pillar-item">
                <Scale size={16} />
                <span>
                  <strong>Legal notices:</strong> Explanations clarify statutory deadlines and rights without substituting for legal counsel.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
