import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const crampedTextRef = useRef(null);
  const resolvedTextRef = useRef(null);
  const subheadRef = useRef(null);
  const bgTexturesRef = useRef(null);

  const [isResolved, setIsResolved] = useState(false);

  const isResolvedRef = useRef(false);
  const isResolvingRef = useRef(false);
  const isUnlockedRef = useRef(false);
  const silenceTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchActiveRef = useRef(false);
  const activeTimelineRef = useRef(null);

  // Transition: Cramped -> Resolved
  const transitionToResolved = useCallback((immediate = false) => {
    if (isResolvedRef.current) return;

    isResolvedRef.current = true;
    setIsResolved(true);

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    if (immediate) {
      gsap.set(cramped, { opacity: 0, scale: 1.02 });
      gsap.set(bgTextures, { opacity: 0, scale: 0.95 });
      gsap.set(resolved, { opacity: 1, scale: 1, y: 0 });
      gsap.set(subhead, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    activeTimelineRef.current = tl;

    // Step 1: Cramped text untangles and fades away
    tl.to(cramped, {
      opacity: 0,
      scale: 1.02,
      duration: 0.28,
      ease: 'power2.inOut'
    }, 0);

    // Official rubber stamps fade completely into background
    tl.to(bgTextures, {
      opacity: 0,
      scale: 0.95,
      duration: 0.26,
      ease: 'power2.out'
    }, 0.02);

    // Step 2: "Oh. Now I get it." cross-fades in with clarity
    tl.to(resolved, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.06);

    // Step 3: Subhead and CTA buttons fade in promptly
    tl.to(subhead, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power1.out'
    }, 0.1);
  }, []);

  // Transition: Resolved -> Cramped (If user scrolls back up to top and pulls up)
  const transitionToCramped = useCallback(() => {
    if (!isResolvedRef.current) return;

    isResolvedRef.current = false;
    setIsResolved(false);

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    activeTimelineRef.current = tl;

    tl.to(subhead, {
      opacity: 0,
      y: 16,
      duration: 0.18,
      ease: 'power2.in'
    }, 0);

    tl.to(resolved, {
      opacity: 0,
      scale: 0.96,
      y: 14,
      duration: 0.2,
      ease: 'power2.in'
    }, 0.03);

    tl.to(cramped, {
      opacity: 1,
      scale: 1,
      duration: 0.24,
      ease: 'power2.out'
    }, 0.06);

    tl.to(bgTextures, {
      opacity: 0.75,
      scale: 1,
      duration: 0.24,
      ease: 'power2.out'
    }, 0.06);
  }, []);

  useEffect(() => {
    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    // Check if initial scroll is already down (e.g. reload or anchor hash)
    if (window.scrollY > 30) {
      transitionToResolved(true);
    } else {
      // Set initial cramped state
      gsap.set(cramped, { opacity: 1, scale: 1, transformOrigin: 'left center' });
      gsap.set(resolved, { opacity: 0, scale: 0.96, y: 14, transformOrigin: 'left center' });
      gsap.set(subhead, { opacity: 0, y: 16 });
      gsap.set(bgTextures, { opacity: 0.75, scale: 1 });
    }

    const handleWindowScroll = () => {
      if (window.scrollY > 20 && !isResolvedRef.current) {
        transitionToResolved(true);
      }
    };

    // Wheel event handler:
    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 10;

      // 1. Initial downward scroll from cramped state:
      // Untangle into "Oh. Now I get it."
      if (isAtTop && !isResolvedRef.current && e.deltaY > 0) {
        e.preventDefault();
        transitionToResolved(false);
        return;
      }

      // 2. User is at top, resolved, and pulls/scrolls UP: fold back to cramped
      if (isAtTop && isResolvedRef.current && e.deltaY < -25) {
        e.preventDefault();
        transitionToCramped();
        return;
      }

      // 3. Second scroll & all other scrolls: proceed completely naturally without interference!
    };

    // Touch handlers for mobile and tablet devices
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (!e.touches || e.touches.length === 0) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // positive = swiping up to scroll down

      // 1. First swipe up from cramped state: untangle into "Oh. Now I get it."
      if (isAtTop && !isResolvedRef.current && diffY > 8) {
        if (e.cancelable) e.preventDefault();
        transitionToResolved(false);
        return;
      }

      // 2. Swipe down at top when resolved: fold back to cramped
      if (isAtTop && isResolvedRef.current && diffY < -25) {
        if (e.cancelable) e.preventDefault();
        transitionToCramped();
        return;
      }
    };

    // Keyboard handlers (Down arrow, PageDown, Space)
    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (!isAtTop) return;

      const isDownKey = ['ArrowDown', 'PageDown', ' '].includes(e.key);
      const isUpKey = ['ArrowUp', 'PageUp'].includes(e.key);

      if (isDownKey && !isResolvedRef.current) {
        e.preventDefault();
        transitionToResolved(false);
      } else if (isUpKey && isResolvedRef.current) {
        e.preventDefault();
        transitionToCramped();
      }
    };

    // Global listener for anchor clicks (navbar links, buttons) to ensure instant resolve
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        transitionToResolved(true);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleAnchorClick);
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [transitionToResolved, transitionToCramped]);

  const unlockForNav = () => {
    transitionToResolved(true);
  };

  return (
    <section
      ref={containerRef}
      className={`hero-scroll-wrapper ${isResolved ? 'is-resolved' : ''}`}
      id="hero"
      aria-label="Introduction to Hmm"
    >
      <div className="hero-pinned-viewport">
        {/* Faint Background Document Textures (Fades out when resolved) */}
        <div
          ref={bgTexturesRef}
          className="hero-doc-textures"
          aria-hidden="true"
        >
          {/* Blurred Official Rubber Stamp */}
          <div className="hero-stamp hero-stamp--left">
            <span>OFFICIAL NOTICE — PENDING JURISDICTION</span>
            <div className="hero-stamp-sub">SEC 148-B / STATUTORY DEFAULT</div>
          </div>

          {/* Dotted signature line & highlighted clause */}
          <div className="hero-clause-line hero-clause-line--top"></div>
          <div className="hero-clause-highlight">
            WHEREAS default has accrued under subsection 13(2)...
          </div>
          <div className="hero-clause-line hero-clause-line--bot"></div>

          <div className="hero-stamp hero-stamp--right">
            <span>CLINICAL PATHOLOGY — ABNORMAL</span>
            <div className="hero-stamp-sub">REF: METABOLIC DYSFUNCTION</div>
          </div>
        </div>

        {/* Main Content Stage */}
        <div className="container hero-content-stage">
          {/* Section kicker */}
          <div className="section-kicker">
            <Sparkles size={14} className="kicker-icon" />
            <span>Document Clarity Engine</span>
          </div>

          {/* The Transforming Headline Stage (Pure transform & opacity cross-fade) */}
          <div className="hero-headline-stage">
            {/* 1. Cramped, dense, confusing state */}
            <h1
              ref={crampedTextRef}
              className="hero-headline hero-headline--cramped"
            >
              “Hmm... what does this even mean?”
              <span className="hero-scan-marker">§ 148(B) r/w 13(2) [PENAL]</span>
            </h1>

            {/* 2. Resolved, clear, confident state */}
            <h1
              ref={resolvedTextRef}
              className="hero-headline hero-headline--resolved"
            >
              “Oh. Now I get it.”
            </h1>
          </div>

          {/* Subhead and CTA (appears smoothly below resolved headline) */}
          <div
            ref={subheadRef}
            className="hero-resolution-block"
          >
            <p className="hero-subhead">
              Hmm turns confusing government notices, medical reports, and prescriptions into
              plain language you can read or hear — in your own language.
            </p>

            <div className="hero-cta-group">
              <a
                href="#try-hmm"
                className="btn-clarity btn-clarity--hero"
                onClick={unlockForNav}
              >
                <FileText size={18} />
                <span>Try it with a document</span>
              </a>

              <a
                href="#how-it-works"
                className="btn-ghost"
                onClick={unlockForNav}
              >
                <span>See how it works</span>
              </a>
            </div>

            {/* Trust badge */}
            <div className="hero-trust-bar">
              <div className="hero-trust-item">
                <CheckCircle2 size={15} className="trust-icon" />
                <span>Zero legal or medical jargon</span>
              </div>
              <div className="hero-trust-item">
                <CheckCircle2 size={15} className="trust-icon" />
                <span>Spoken aloud in Tamil, Hindi & 6 more</span>
              </div>
              <div className="hero-trust-item">
                <CheckCircle2 size={15} className="trust-icon" />
                <span>Concrete "what to do next" action card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
