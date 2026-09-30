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
  const isLockedRef = useRef(false);
  const gestureDebounceTimerRef = useRef(null);
  const cooldownTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const activeTimelineRef = useRef(null);

  // Transition: Cramped -> Resolved (Freeze on completion)
  const transitionToResolved = useCallback((immediate = false) => {
    if (isAnimatingRef.current || isResolvedRef.current) return;

    isAnimatingRef.current = true;
    isLockedRef.current = true;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isAnimatingRef.current = false;
      isLockedRef.current = false;
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
      isLockedRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        isResolvedRef.current = true;
        setIsResolved(true);

        // Keep lock active briefly for momentum cooldown so trailing events from the initial flick are absorbed
        clearTimeout(cooldownTimerRef.current);
        cooldownTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, 250);
      }
    });

    activeTimelineRef.current = tl;

    // Step 1: Cramped text untangles and fades away
    tl.to(cramped, {
      opacity: 0,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0);

    // Official rubber stamps fade completely into background
    tl.to(bgTextures, {
      opacity: 0,
      scale: 0.95,
      duration: 0.28,
      ease: 'power2.out'
    }, 0.02);

    // Step 2: "Oh. Now I get it." cross-fades in with clarity
    tl.to(resolved, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.32,
      ease: 'power2.out'
    }, 0.08);

    // Step 3: Subhead and CTA buttons fade in promptly
    tl.to(subhead, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      ease: 'power1.out'
    }, 0.12);
  }, []);

  // Transition: Resolved -> Cramped (If scrolled back up to top and user scrolls up)
  const transitionToCramped = useCallback(() => {
    if (isAnimatingRef.current || !isResolvedRef.current) return;

    isAnimatingRef.current = true;
    isLockedRef.current = true;

    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!cramped || !resolved || !subhead || !bgTextures) {
      isAnimatingRef.current = false;
      isLockedRef.current = false;
      return;
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        isResolvedRef.current = false;
        setIsResolved(false);

        clearTimeout(cooldownTimerRef.current);
        cooldownTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, 250);
      }
    });

    activeTimelineRef.current = tl;

    tl.to(subhead, {
      opacity: 0,
      y: 16,
      duration: 0.2,
      ease: 'power2.in'
    }, 0);

    tl.to(resolved, {
      opacity: 0,
      scale: 0.96,
      y: 14,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.04);

    tl.to(cramped, {
      opacity: 1,
      scale: 1,
      duration: 0.26,
      ease: 'power2.out'
    }, 0.08);

    tl.to(bgTextures, {
      opacity: 0.75,
      scale: 1,
      duration: 0.26,
      ease: 'power2.out'
    }, 0.08);
  }, []);

  useEffect(() => {
    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    // Check if initial scroll is already down (e.g. page reload down or anchor hash)
    if (window.scrollY > 30) {
      transitionToResolved(true);
    } else {
      // Set initial cramped state
      gsap.set(cramped, { opacity: 1, scale: 1, transformOrigin: 'left center' });
      gsap.set(resolved, { opacity: 0, scale: 0.96, y: 14, transformOrigin: 'left center' });
      gsap.set(subhead, { opacity: 0, y: 16 });
      gsap.set(bgTextures, { opacity: 0.75, scale: 1 });
    }

    // Scroll listener for programmatic jumps / fast scrollbar dragging
    const handleWindowScroll = () => {
      if (window.scrollY > 30 && !isResolvedRef.current && !isAnimatingRef.current) {
        transitionToResolved(true);
      }
    };

    // Wheel event handler:
    // If at top and NOT resolved: freeze in place and animate to resolved frame.
    // Trailing inertia from that gesture is swallowed until scrolling stops.
    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 15;

      // 1. If at top and currently in cramped state, scrolling down triggers untangle & freezes
      if (isAtTop && !isResolvedRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          transitionToResolved(false);

          // Prolong gesture debounce so trailing inertia events from same flick are absorbed
          clearTimeout(gestureDebounceTimerRef.current);
          gestureDebounceTimerRef.current = setTimeout(() => {
            isLockedRef.current = false;
          }, 250);
          return;
        }
      }

      // 2. While animation is running or cooldown lock is active, absorb downward wheel momentum
      if (isAtTop && (isAnimatingRef.current || isLockedRef.current)) {
        if (e.deltaY > 0) {
          e.preventDefault();
          clearTimeout(gestureDebounceTimerRef.current);
          gestureDebounceTimerRef.current = setTimeout(() => {
            if (!isAnimatingRef.current) {
              isLockedRef.current = false;
            }
          }, 250);
          return;
        }
      }

      // 3. If at top and already resolved, scrolling up animates back to cramped
      if (isAtTop && isResolvedRef.current && !isAnimatingRef.current && !isLockedRef.current) {
        if (e.deltaY < -15) {
          e.preventDefault();
          transitionToCramped();

          clearTimeout(gestureDebounceTimerRef.current);
          gestureDebounceTimerRef.current = setTimeout(() => {
            isLockedRef.current = false;
          }, 250);
          return;
        }
      }

      // 4. Otherwise (hero is resolved and user scrolls down again), native scrolling continues!
    };

    // Touch handlers for mobile/tablet devices
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 15;
      if (!isAtTop) return;

      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // positive = swiping up to scroll down

      // If at top and not resolved: swiping up resolves hero and freezes
      if (!isResolvedRef.current && diffY > 8) {
        if (e.cancelable) e.preventDefault();
        transitionToResolved(false);
        return;
      }

      // Absorb movement while locked or animating
      if (isAnimatingRef.current || isLockedRef.current) {
        if (e.cancelable && diffY > 0) {
          e.preventDefault();
        }
        return;
      }

      // If resolved and swiping down at top: return to cramped
      if (isResolvedRef.current && diffY < -20) {
        if (e.cancelable) e.preventDefault();
        transitionToCramped();
        return;
      }
    };

    const handleTouchEnd = () => {
      if (!isAnimatingRef.current) {
        clearTimeout(cooldownTimerRef.current);
        cooldownTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, 180);
      }
    };

    // Keyboard handlers (Down arrow, PageDown, Space)
    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 15;
      if (!isAtTop) return;

      if (!isResolvedRef.current && ['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        transitionToResolved(false);
      } else if (isResolvedRef.current && !isAnimatingRef.current && !isLockedRef.current && ['ArrowUp', 'PageUp'].includes(e.key)) {
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
      clearTimeout(gestureDebounceTimerRef.current);
      clearTimeout(cooldownTimerRef.current);
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [transitionToResolved, transitionToCramped]);

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
              <a href="#try-hmm" className="btn-clarity btn-clarity--hero">
                <FileText size={18} />
                <span>Try it with a document</span>
              </a>

              <a href="#how-it-works" className="btn-ghost">
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
