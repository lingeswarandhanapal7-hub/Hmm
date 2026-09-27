import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheProblem from './components/TheProblem';
import HowItWorks from './components/HowItWorks';
import TryHmmDemo from './components/TryHmmDemo';
import SupportedLanguages from './components/SupportedLanguages';
import WhyHmmDifferent from './components/WhyHmmDifferent';
import ResponsibleNotice from './components/ResponsibleNotice';
import Team from './components/Team';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFoundModal from './components/NotFoundModal';

export default function App() {
  const [selectedDocForDemo, setSelectedDocForDemo] = useState('gov-notice');
  const [is404Open, setIs404Open] = useState(false);

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
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* 1. Signature Moment: Scroll-Driven Hero */}
        <Hero />

        {/* 2. The Problem: Editorial layout with 3 overlapping paper documents */}
        <TheProblem onSelectDocForDemo={handleSelectDocForDemo} />

        {/* 3. How Hmm Works: 4 Numbered Steps */}
        <HowItWorks />

        {/* 4. Try Hmm: Live Demo Widget */}
        <TryHmmDemo initialDocId={selectedDocForDemo} />

        {/* 5. Supported Languages in Native Scripts */}
        <SupportedLanguages />

        {/* 6. Why Hmm is Different: 3 Factual Points */}
        <WhyHmmDifferent />

        {/* 7. Responsible by Design Callout */}
        <ResponsibleNotice />

        {/* 8. Team: Gear5coders */}
        <Team />

        {/* 9. Final CTA Band: Clarity Gold & Ink */}
        <FinalCTA />
      </main>

      {/* Site Footer */}
      <Footer onOpen404Demo={() => setIs404Open(true)} />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* 404 Preview Modal */}
      <NotFoundModal isOpen={is404Open} onClose={() => setIs404Open(false)} />
    </div>
  );
}
