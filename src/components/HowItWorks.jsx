import React from 'react';
import { Camera, Cpu, Volume2, CheckSquare } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Upload or photograph',
    summary: 'Snap a picture of any notice, report, or prescription.',
    detail: 'Use your phone camera or drag a document file onto the page. No need for perfect lighting or flat scans — our image pre-processing corrects perspective angles and glare.',
    icon: Camera,
    tag: 'Input'
  },
  {
    num: '02',
    title: 'Hmm reads it for you',
    summary: 'OCR pulls the text, AI simplifies it into plain language.',
    detail: 'Trained models separate critical legal and medical clauses from ceremonial boilerplate. Jargon is translated into everyday words anyone in your family can understand.',
    icon: Cpu,
    tag: 'Extraction & AI'
  },
  {
    num: '03',
    title: 'Hear it in your language',
    summary: 'Tamil, Hindi, Telugu, and more, spoken aloud.',
    detail: 'Because understanding happens through the ear for many low-literacy users, Hmm speaks the explanation out loud in natural, conversational cadence in their native mother tongue.',
    icon: Volume2,
    tag: 'Voice Synthesis'
  },
  {
    num: '04',
    title: 'Know what to do next',
    summary: 'A clear action card, grounded in real rules, not a guess.',
    detail: 'Instead of leaving you wondering, you receive a concrete checklist: pay ₹14,250 before Oct 15, bring medicine strips to your doctor, or submit Form 7. Sourced from actual statutory rules.',
    icon: CheckSquare,
    tag: 'Action Checklist'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works" aria-labelledby="how-heading">
      <div className="container">
        <div className="how-header">
          <div className="section-kicker">
            <span>The Workflow</span>
          </div>
          <h2 id="how-heading" className="how-title">
            From confusing letter to clear next step in four moments.
          </h2>
          <p className="how-intro">
            A quiet, disciplined pipeline designed to eliminate hesitation at every step.
          </p>
        </div>

        {/* 4 Numbered Steps Sequence */}
        <div className="how-grid" role="list">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="how-step-card paper-sheet" role="listitem">
                <div className="step-card-header">
                  <span className="step-number">{step.num}</span>
                  <span className="step-tag">{step.tag}</span>
                </div>

                <div className="step-icon-wrap" aria-hidden="true">
                  <Icon size={22} className="step-icon" />
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-summary">{step.summary}</p>
                <p className="step-detail">{step.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
