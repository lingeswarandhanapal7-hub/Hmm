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
  const isAnimatingRef = useRef(false);
  const freezeLockRef = useRef(false);
  const freezeTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchStartedInCrampedRef = useRef(false);
  const activeTimelineRef = useRef(null);

  // Transition: Cramped -> Resolved (Freeze briefly during untangle, then unlock)
  const transitionToResolved = useCallback((immediate = false) => {
    if (isAnimatingRef.current || isResolvedRef.current) return;

    isAnimatingRef.current = true;
    freezeLockRef.current = true;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isAnimatingRef.current = false;
      freezeLockRef.current = false;
      return;
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    if (immediate) {
      gsap.set(cramped, { opacity: 0, scale: 1.02 });
      gsap.set(bgTextures, { opacity: 0, scale: 0.95 });
      gsap.set(resolved, { opacity: 1, scale: 1, y: 0 });
      gsap.set(subhead, { opacity: 1, y: 0 });
      isResolvedRef.current = true;
      setIsResolved(true);
      isAnimatingRef.current = false;
      freezeLockRef.current = false;
      return;
    }

    // Fixed 380ms freeze window: swallows trailing inertia from stroke 1 without cascading
    clearTimeout(freezeTimerRef.current);
    freezeTimerRef.current = setTimeout(() => {
      freezeLockRef.current = false;
      isAnimatingRef.current = false;
    }, 380);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        isResolvedRef.current = true;
        setIsResolved(true);
      }
    });

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
    if (isAnimatingRef.current || !isResolvedRef.current) return;

    isAnimatingRef.current = true;
    freezeLockRef.current = true;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isAnimatingRef.current = false;
      freezeLockRef.current = false;
      return;
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    clearTimeout(freezeTimerRef.current);
    freezeTimerRef.current = setTimeout(() => {
      freezeLockRef.current = false;
      isAnimatingRef.current = false;
    }, 350);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        isResolvedRef.current = false;
        setIsResolved(false);
      }
    });

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
      freezeLockRef.current = false;
    } else {
      // Set initial cramped state
      gsap.set(cramped, { opacity: 1, scale: 1, transformOrigin: 'left center' });
      gsap.set(resolved, { opacity: 0, scale: 0.96, y: 14, transformOrigin: 'left center' });
      gsap.set(subhead, { opacity: 0, y: 16 });
      gsap.set(bgTextures, { opacity: 0.75, scale: 1 });
      freezeLockRef.current = false;
    }

    // Window scroll safety guard:
    // Only lock to 0 while the untangle freeze is explicitly running
    const handleWindowScroll = () => {
      if (freezeLockRef.current && window.scrollY > 0 && window.scrollY < 80) {
        window.scrollTo(0, 0);
        return;
      }

      if (window.scrollY > 80 && !isResolvedRef.current) {
        transitionToResolved(true);
      }
    };

    // Wheel event handler:
    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 10;

      // 1. Initial downward scroll from cramped state: untangle and freeze!
      if (isAtTop && !isResolvedRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, 0);
          transitionToResolved(false);
          return;
        }
      }

      // 2. During the brief 380ms freeze window, swallow trailing wheel ticks
      if (isAtTop && freezeLockRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, 0);
          return;
        }
      }

      // 3. User is at top, resolved, not locked, and scrolls UP: fold back to cramped
      if (isAtTop && isResolvedRef.current && !freezeLockRef.current && !isAnimatingRef.current) {
        if (e.deltaY < -25) {
          e.preventDefault();
          transitionToCramped();
          return;
        }
      }

      // 4. Second scroll down: NATIVE SCROLL PROCEEDS FREELY INTO SECTION 2!
    };

    // Touch handlers for mobile and tablet devices
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartedInCrampedRef.current = !isResolvedRef.current && window.scrollY <= 10;
      }
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (!isAtTop) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // positive = swiping up to scroll down

      // 1. First swipe up from cramped state: untangle and freeze!
      if (!isResolvedRef.current && diffY > 8) {
        if (e.cancelable) e.preventDefault();
        window.scrollTo(0, 0);
        transitionToResolved(false);
        return;
      }

      // 2. Trailing movement during the first swipe or freeze window:
      if ((freezeLockRef.current || touchStartedInCrampedRef.current) && diffY > 0) {
        if (e.cancelable) e.preventDefault();
        window.scrollTo(0, 0);
        return;
      }

      // 3. Swipe down at top when resolved: animate back to cramped
      if (isResolvedRef.current && !freezeLockRef.current && !isAnimatingRef.current && diffY < -25) {
        if (e.cancelable) e.preventDefault();
        transitionToCramped();
        return;
      }

      // 4. Second swipe up: NATIVE SCROLL PROCEEDS FREELY INTO SECTION 2!
    };

    const handleTouchEnd = () => {
      touchStartedInCrampedRef.current = false;
      if (isResolvedRef.current) {
        clearTimeout(freezeTimerRef.current);
        freezeTimerRef.current = setTimeout(() => {
          freezeLockRef.current = false;
          isAnimatingRef.current = false;
        }, 120);
      }
    };

    // Keyboard handlers (Down arrow, PageDown, Space)
    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (!isAtTop) return;

      if (!isResolvedRef.current && ['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        window.scrollTo(0, 0);
        transitionToResolved(false);
      } else if (freezeLockRef.current && ['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        window.scrollTo(0, 0);
      } else if (isResolvedRef.current && !freezeLockRef.current && !isAnimatingRef.current && ['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        transitionToCramped();
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(freezeTimerRef.current);
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [transitionToResolved, transitionToCramped]);

  const unlockForNav = () => {
    freezeLockRef.current = false;
    isAnimatingRef.current = false;
    isResolvedRef.current = true;
    setIsResolved(true);
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
