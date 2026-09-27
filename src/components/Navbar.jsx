import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Genuine "Read this page aloud" feature for low-literacy & elderly users
  const toggleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      window.speechSynthesis.cancel();
      const pageSummary = 
        "Welcome to Hmm. We turn confusing government notices, medical reports, and prescriptions into plain language you can read or hear in your own language. Upload a photo of any document to get a simple explanation and a clear action card telling you what to do next.";
      
      const utterance = new SpeechSynthesisUtterance(pageSummary);
      window.__navbarUtterance = utterance;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        window.__navbarUtterance = null;
        setIsReadingAloud(false);
      };
      utterance.onerror = () => {
        window.__navbarUtterance = null;
        setIsReadingAloud(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="container navbar__inner">
          {/* Hmm Wordmark */}
          <a href="#" className="navbar__brand" aria-label="Hmm Home">
            <span className="navbar__logo-text">Hmm</span>
            <span className="navbar__logo-dot" aria-hidden="true"></span>
            <span className="navbar__logo-tagline">Understand Any Document</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar__nav" aria-label="Main Navigation">
            <a href="#the-problem" className="nav-link">The Problem</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#try-hmm" className="nav-link">Try Hmm</a>
            <a href="#languages" className="nav-link">Languages</a>
            <a href="#why-hmm" className="nav-link">Why Hmm</a>
            <a href="#team" className="nav-link">Team</a>
          </nav>

          {/* Right Action Elements */}
          <div className="navbar__actions">
            {/* Read Page Aloud Accessibility Toggle */}
            <button
              type="button"
              className={`btn-read-aloud ${isReadingAloud ? 'btn-read-aloud--active' : ''}`}
              onClick={toggleReadAloud}
              title={isReadingAloud ? "Stop reading page aloud" : "Read this page aloud"}
              aria-label={isReadingAloud ? "Stop reading page aloud" : "Read this page aloud"}
            >
              {isReadingAloud ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="read-aloud-text">
                {isReadingAloud ? "Stop Voice" : "Read Aloud"}
              </span>
            </button>

            {/* Try It Primary Button */}
            <a
              href="#try-hmm"
              className="btn-clarity navbar__cta"
              onClick={onOpenDemo}
            >
              Try it
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="navbar__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'mobile-drawer-backdrop--open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!mobileMenuOpen}
      />
      
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer__header">
          <div className="navbar__brand">
            <span className="navbar__logo-text">Hmm</span>
            <span className="navbar__logo-dot"></span>
          </div>
          <button
            type="button"
            className="mobile-drawer__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <a href="#the-problem" onClick={closeMenu} className="mobile-drawer__link">The Problem</a>
          <a href="#how-it-works" onClick={closeMenu} className="mobile-drawer__link">How It Works</a>
          <a href="#try-hmm" onClick={closeMenu} className="mobile-drawer__link">Try Hmm (Demo)</a>
          <a href="#languages" onClick={closeMenu} className="mobile-drawer__link">Supported Languages</a>
          <a href="#why-hmm" onClick={closeMenu} className="mobile-drawer__link">Why Hmm is Different</a>
          <a href="#team" onClick={closeMenu} className="mobile-drawer__link">Team Gear5coders</a>
        </nav>

        <div className="mobile-drawer__footer">
          <button
            type="button"
            className={`btn-read-aloud btn-read-aloud--full ${isReadingAloud ? 'btn-read-aloud--active' : ''}`}
            onClick={() => {
              toggleReadAloud();
              closeMenu();
            }}
          >
            {isReadingAloud ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isReadingAloud ? "Stop Reading Aloud" : "Read Page Summary Aloud"}</span>
          </button>
          
          <a
            href="#try-hmm"
            className="btn-clarity btn-clarity--full"
            onClick={closeMenu}
          >
            Try Hmm with a Document
          </a>
        </div>
      </div>
    </>
  );
}
