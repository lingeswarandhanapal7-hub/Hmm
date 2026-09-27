import { Heart, Shield, FileQuestion, Mail } from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Footer({ onOpen404Demo }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="footer-brand-text">Hmm</span>
              <span className="footer-brand-dot"></span>
            </div>
            <p className="footer-tagline">
              Hmm — Understand Any Document, Instantly.
            </p>
            <p className="footer-mission">
              A calm, capable friend who explains the confusing letter you just got in the mail.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-link-list">
              <li><a href="#the-problem">The Problem</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#try-hmm">Try Live Demo</a></li>
              <li><a href="#languages">Supported Languages</a></li>
              <li><a href="#why-hmm">Why Hmm is Different</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Accessibility & Ethics</h4>
            <ul className="footer-link-list">
              <li><a href="#the-problem">Health & Legal Literacy</a></li>
              <li><a href="#try-hmm">Regional Voice Reader</a></li>
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={onOpen404Demo}
                  title="View custom 404 page design"
                >
                  <FileQuestion size={14} />
                  <span>Preview 404 Page</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-heading">Team & Open Source</h4>
            <ul className="footer-link-list">
              <li>
                <a
                  href="https://github.com/Gear5coders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon-link"
                >
                  <GithubIcon size={15} />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a href="#team">Gear5coders Team</a>
              </li>
              <li>
                <a href="mailto:contact@gear5coders.dev" className="footer-icon-link">
                  <Mail size={15} />
                  <span>contact@gear5coders.dev</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-credits">
            <span>Built by <strong>Gear5coders</strong> with care for every citizen.</span>
          </div>
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} Hmm. All rights reserved.</span>
            <span className="footer-sep">•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
