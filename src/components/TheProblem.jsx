import React, { useState } from 'react';
import { AlertCircle, FileWarning, Eye, ArrowRight, ShieldAlert } from 'lucide-react';
import { SAMPLE_DOCUMENTS, SOURCED_STATISTIC } from '../data/mockData';

export default function TheProblem({ onSelectDocForDemo }) {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  return (
    <section className="problem-section" id="the-problem" aria-labelledby="problem-heading">
      <div className="container">
        <div className="problem-layout">
          {/* Left Editorial Narrative */}
          <div className="problem-editorial">
            <div className="section-kicker">
              <span>The Problem</span>
            </div>

            <h2 id="problem-heading" className="problem-title">
              When official paper speaks a foreign dialect, people pay with their savings and health.
            </h2>

            <div className="problem-copy">
              <p>
                Every morning across India and multilingual regions, postmen deliver registered notices,
                pathology labs hand over blood panels, and hospital counters staple handwritten prescriptions.
                Nearly all of them are drafted in dense, technical English designed for lawyers and doctors —
                not the families holding them.
              </p>

              <p>
                For millions of low-literacy elders, daily wage earners, and non-native English speakers,
                these documents don't communicate — they paralyze:
              </p>

              <ul className="problem-consequences-list">
                <li className="consequence-item">
                  <span className="consequence-bullet consequence-bullet--seal"></span>
                  <div>
                    <strong>Missed statutory deadlines & penal liens:</strong> A harmless 15-day waiver window
                    is mistaken for a court summons, or forgotten until bank accounts face attachment.
                  </div>
                </li>
                <li className="consequence-item">
                  <span className="consequence-bullet consequence-bullet--calm"></span>
                  <div>
                    <strong>Unmanaged chronic health markers:</strong> An HbA1c score of 9.4% is filed away as
                    "just another lab sheet" while kidney strain worsens silently.
                  </div>
                </li>
                <li className="consequence-item">
                  <span className="consequence-bullet consequence-bullet--clarity"></span>
                  <div>
                    <strong>Reliance on predatory middlemen:</strong> Families pay ₹500 to ₹2,000 to local
                    middlemen and touts simply to have someone translate three lines of text.
                  </div>
                </li>
              </ul>
            </div>

            {/* Sourced Comprehension Statistic Callout */}
            <div className="stat-callout paper-sheet">
              <div className="stat-callout__number">{SOURCED_STATISTIC.figure}</div>
              <div className="stat-callout__content">
                <p className="stat-callout__text">{SOURCED_STATISTIC.text}</p>
                <span className="stat-callout__citation">{SOURCED_STATISTIC.citation}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three Slightly Overlapping Gently Rotated Paper Documents */}
          <div className="problem-visual-stage" aria-label="Visual demonstration of confusing documents">
            <div className="paper-stack-container">
              {SAMPLE_DOCUMENTS.map((doc, idx) => {
                const isSelected = activeSheetIndex === idx;
                // Asymmetric gentle rotation & overlapping offsets
                const rotationAngles = [-2.5, 1.8, -1.2];
                const angle = rotationAngles[idx] || 0;

                return (
                  <article
                    key={doc.id}
                    className={`overlapping-paper overlapping-paper--${idx} ${
                      isSelected ? 'overlapping-paper--active' : ''
                    }`}
                    style={{
                      zIndex: isSelected ? 10 : 3 - idx
                    }}
                    onClick={() => setActiveSheetIndex(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${doc.title}. Click to bring forward.`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveSheetIndex(idx);
                      }
                    }}
                  >
                    {/* Paper Header Strip */}
                    <div className="paper-doc-header">
                      <div className="paper-doc-meta">
                        <span className="paper-doc-badge">{doc.badge}</span>
                        <span className="paper-doc-date">{doc.date}</span>
                      </div>
                      <span className="rubber-stamp">{doc.stamps[0]}</span>
                    </div>

                    <h3 className="paper-doc-title">{doc.title}</h3>
                    <div className="paper-doc-authority">{doc.issuingAuthority}</div>
                    <div className="paper-doc-ref">Ref: {doc.refNumber}</div>

                    {/* Verbatim Jargon Snippet with red underlines and stamp effect */}
                    <div className="paper-doc-body">
                      <pre className="paper-doc-pre">{doc.rawExcerpt}</pre>
                    </div>

                    {/* Paper Footer with quick Try in Demo button */}
                    <div className="paper-doc-footer">
                      <span className="paper-doc-click-hint">
                        {isSelected ? 'Currently inspecting' : 'Click to inspect sheet'}
                      </span>
                      <a
                        href="#try-hmm"
                        className="paper-doc-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectDocForDemo) onSelectDocForDemo(doc.id);
                        }}
                      >
                        <span>Simplify this</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="stack-switcher-cues">
              <span className="switcher-label">Select document to inspect:</span>
              <div className="switcher-buttons">
                {SAMPLE_DOCUMENTS.map((doc, idx) => (
                  <button
                    key={doc.id}
                    type="button"
                    className={`switcher-pill ${activeSheetIndex === idx ? 'switcher-pill--active' : ''}`}
                    onClick={() => setActiveSheetIndex(idx)}
                  >
                    {idx + 1}. {doc.badge}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
