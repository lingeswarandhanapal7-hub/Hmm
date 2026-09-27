import React from 'react';
import { X, FileQuestion, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="not-found-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="not-found-title">
      <div className="not-found-modal-card paper-sheet">
        <button
          type="button"
          className="not-found-close-btn"
          onClick={onClose}
          aria-label="Close 404 Preview"
        >
          <X size={20} />
        </button>

        <div className="not-found-header">
          <span className="rubber-stamp">DOCUMENT NOT ON FILE</span>
          <h2 id="not-found-title" className="not-found-code">404</h2>
          <h3 className="not-found-heading">“Hmm... this page doesn't seem to exist.”</h3>
        </div>

        <div className="not-found-body">
          <p>
            Just like an unreadable stamp or a missing dispatch number, the page you were looking for
            could not be retrieved from the archives.
          </p>

          <div className="not-found-action-card">
            <span className="not-found-action-kicker">Recommended next steps:</span>
            <ul className="not-found-checklist">
              <li>Check if the web address was typed with a typographical error</li>
              <li>Return to the main page to simplify a government, medical, or prescription document</li>
              <li>Or jump directly to the interactive document demo</li>
            </ul>
          </div>

          <div className="not-found-actions">
            <button
              type="button"
              className="btn-clarity"
              onClick={onClose}
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </button>

            <a
              href="#try-hmm"
              className="btn-ghost"
              onClick={onClose}
            >
              <span>Try Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
