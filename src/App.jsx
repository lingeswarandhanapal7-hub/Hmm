import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheProblem from './components/TheProblem';
import HowItWorks from './components/HowItWorks';
import TryHmmDemo from './components/TryHmmDemo';
import SupportedLanguages from './components/SupportedLanguages';
import WhyHmmDifferent from './components/WhyHmmDifferent';
import ResponsibleNotice from './components/ResponsibleNotice';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFoundModal from './components/NotFoundModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [selectedDocForDemo, setSelectedDocForDemo] = useState('gov-notice');
  const [is404Open, setIs404Open] = useState(false);

  // User authentication state
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hmm_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('signup');
  const [pendingUploadFile, setPendingUploadFile] = useState(null);
  const [queuedFileForDemo, setQueuedFileForDemo] = useState(null);

  // Check URL hash on load for #login or #signup
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login') {
        setAuthInitialMode('login');
        setIsAuthOpen(true);
      } else if (hash === '#signup') {
        setAuthInitialMode('signup');
        setIsAuthOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenAuth = (mode = 'signup', file = null) => {
    setAuthInitialMode(mode);
    setPendingUploadFile(file);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (userData, fileToProcess) => {
    setUser(userData);
    try {
      localStorage.setItem('hmm_user', JSON.stringify(userData));
    } catch (err) {
      console.warn('Could not save user to localStorage:', err);
    }
    setIsAuthOpen(false);
    setPendingUploadFile(null);

    if (fileToProcess) {
      setQueuedFileForDemo(fileToProcess);
      const demoElement = document.getElementById('try-hmm');
      if (demoElement) {
        demoElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('hmm_user');
    } catch (err) {
      console.warn('Could not remove user from localStorage:', err);
    }
  };

  const handleSelectDocForDemo = (docId) => {
    setSelectedDocForDemo(docId);
    const demoElement = document.getElementById('try-hmm');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDemo = () => {
    const demoElement = document.getElementById('try-hmm');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hmm-app-root">
      {/* Skip to Content for Screen Readers & Keyboard Nav */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Sticky Top Navigation */}
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDemo={handleOpenDemo}
      />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* 1. Signature Moment: Scroll-Driven Hero */}
        <Hero />

        {/* 2. The Problem: Editorial layout with 3 overlapping paper documents */}
        <TheProblem onSelectDocForDemo={handleSelectDocForDemo} />

        {/* 3. How Hmm Works: 4 Numbered Steps */}
        <HowItWorks />

        {/* 4. Try Hmm: Live Demo Widget */}
        <TryHmmDemo
          initialDocId={selectedDocForDemo}
          user={user}
          onRequireAuth={handleOpenAuth}
          queuedFile={queuedFileForDemo}
          onClearQueuedFile={() => setQueuedFileForDemo(null)}
        />

        {/* 5. Supported Languages in Native Scripts */}
        <SupportedLanguages />

        {/* 6. Why Hmm is Different: 3 Factual Points */}
        <WhyHmmDifferent />

        {/* 7. Responsible by Design Callout */}
        <ResponsibleNotice />

        {/* 8. Final CTA Band: Clarity Gold & Ink */}
        <FinalCTA />
      </main>

      {/* Site Footer */}
      <Footer onOpen404Demo={() => setIs404Open(true)} />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* 404 Preview Modal */}
      <NotFoundModal isOpen={is404Open} onClose={() => setIs404Open(false)} />

      {/* Citizen Sign Up & Log In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authInitialMode}
        pendingFile={pendingUploadFile}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingUploadFile(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
