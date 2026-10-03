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
  // Stops the scroll in "Oh. Now I get it." and keeps it completely stopped!
  const transitionToResolved = useCallback((immediate = false) => {
    if (isResolvingRef.current || isResolvedRef.current) return;

    isResolvingRef.current = true;
    isUnlockedRef.current = false;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isResolvingRef.current = false;
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
      isResolvingRef.current = false;
      isUnlockedRef.current = true;
      setIsResolved(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isResolvingRef.current = false;
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
    if (isResolvingRef.current || !isResolvedRef.current) return;

    isResolvingRef.current = true;
    isUnlockedRef.current = false;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isResolvingRef.current = false;
      return;
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isResolvingRef.current = false;
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
    if (window.scrollY > 40) {
      transitionToResolved(true);
      isUnlockedRef.current = true;
    } else {
      // Set initial cramped state
      gsap.set(cramped, { opacity: 1, scale: 1, transformOrigin: 'left center' });
      gsap.set(resolved, { opacity: 0, scale: 0.96, y: 14, transformOrigin: 'left center' });
      gsap.set(subhead, { opacity: 0, y: 16 });
      gsap.set(bgTextures, { opacity: 0.75, scale: 1 });
      isUnlockedRef.current = false;
    }

    // Window scroll safety guard:
    // Any time hero is locked at top, strictly keep at (0, 0) so inertia CANNOT move the page!
    const handleWindowScroll = () => {
      // If user jumped far down via anchor link or fast scrollbar drag (> 80px)
      if (window.scrollY > 80) {
        isUnlockedRef.current = true;
        transitionToResolved(true);
        return;
      }

      // If in locked state and window attempts small involuntary drift:
      if (!isUnlockedRef.current && window.scrollY > 0) {
        window.scrollTo(0, 0);
        return;
      }
    };

    // Wheel event handler:
    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 15;

      // 1. Initial downward scroll from cramped state:
      // Untangle into "Oh. Now I get it." and STOP THE SCROLL completely!
      if (isAtTop && !isResolvedRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, 0);
          transitionToResolved(false);

          // Swallow all trailing wheel ticks and inertia from this first stroke.
          // When the stroke stops and 350ms of silence occurs, unlock so user can scroll naturally!
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            isUnlockedRef.current = true;
          }, 350);
          return;
        }
      }

      // 2. While resolving or locked during the first stroke:
      // Keep absorbing wheel events at (0, 0) until the gesture completely dies down!
      if (isAtTop && !isUnlockedRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          window.scrollTo(0, 0);

          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            isUnlockedRef.current = true;
          }, 350);
          return;
        }

        // If user pulls up at top: fold back to cramped
        if (e.deltaY < -25 && isResolvedRef.current) {
          e.preventDefault();
          transitionToCramped();
          return;
        }
      }

      // 3. User is at top, resolved, unlocked, and scrolls UP: fold back to cramped
      if (isAtTop && isResolvedRef.current && isUnlockedRef.current && e.deltaY < -25) {
        e.preventDefault();
        transitionToCramped();
        return;
      }

      // 4. Otherwise: isUnlockedRef is true!
      // DO NOT PREVENT DEFAULT!
      // DO NOT SCROLL PROGRAMMATICALLY!
      // NATIVE SCROLL PROCEEDS FREELY WITH THE USER'S OWN FINGERS!
    };

    // Touch handlers for mobile and tablet devices
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
        touchActiveRef.current = true;
      }
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 15;
      if (!isAtTop && isUnlockedRef.current) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // positive = swiping up to scroll down

      // 1. First swipe up from cramped state: untangle and STOP the scroll!
      if (isAtTop && !isResolvedRef.current && diffY > 8) {
        if (e.cancelable) e.preventDefault();
        window.scrollTo(0, 0);
        transitionToResolved(false);
        return;
      }

      // 2. While in stroke 1: absorb all upward movement so the page stays stopped at (0, 0)
      if (isAtTop && !isUnlockedRef.current && diffY > 0) {
        if (e.cancelable) e.preventDefault();
        window.scrollTo(0, 0);
        return;
      }

      // 3. Swipe down at top when resolved: fold back to cramped
      if (isAtTop && isResolvedRef.current && diffY < -25) {
        if (e.cancelable) e.preventDefault();
        transitionToCramped();
        return;
      }
    };

    const handleTouchEnd = () => {
      touchActiveRef.current = false;
      // When the finger lifts from the untangle swipe, unlock so the NEXT swipe scrolls naturally!
      if (isResolvedRef.current && !isUnlockedRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          isUnlockedRef.current = true;
        }, 150);
      }
    };

    // Keyboard handlers (Down arrow, PageDown, Space)
    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 10;
      if (!isAtTop) return;

      const isDownKey = ['ArrowDown', 'PageDown', ' '].includes(e.key);
      const isUpKey = ['ArrowUp', 'PageUp'].includes(e.key);

      if (isDownKey) {
        if (!isResolvedRef.current) {
          e.preventDefault();
          window.scrollTo(0, 0);
          transitionToResolved(false);
          setTimeout(() => {
            isUnlockedRef.current = true;
          }, 350);
        } else if (!isUnlockedRef.current) {
          e.preventDefault();
          window.scrollTo(0, 0);
        }
        // If isUnlockedRef is true: native keydown scrolls naturally!
      } else if (isUpKey && isResolvedRef.current) {
        e.preventDefault();
        transitionToCramped();
      }
    };

    // Global listener for anchor clicks (navbar links, buttons) to ensure instant unlock
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        isUnlockedRef.current = true;
        transitionToResolved(true);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(silenceTimerRef.current);
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [transitionToResolved, transitionToCramped]);

  const unlockForNav = () => {
    isUnlockedRef.current = true;
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
