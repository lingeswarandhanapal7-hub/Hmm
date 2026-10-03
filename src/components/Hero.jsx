import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, FileText, CheckCircle2, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const scrollCueRef = useRef(null);
  const decorRef = useRef(null);
  const s1HeadlineRef = useRef(null);
  const s2HeadlineRef = useRef(null);
  const s2ContentRef = useRef(null);

  // Animation timeline & ScrollTrigger references
  const timelineRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Gate state
  const isGatedRef = useRef(false);
  const gateTimeoutRef = useRef(null);
  const gateHardCapTimeoutRef = useRef(null);
  const lastWheelTimeRef = useRef(0);
  const isReducedMotionRef = useRef(false);

  // Set scene to complete/end state (used for anchor jumps and focus)
  const jumpToEndState = useCallback(() => {
    isGatedRef.current = false;
    if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
    if (gateHardCapTimeoutRef.current) clearTimeout(gateHardCapTimeoutRef.current);
    if (sceneRef.current) {
      const top = sceneRef.current.offsetTop;
      const height = sceneRef.current.offsetHeight;
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, top + height - vh);
      if (window.scrollY < maxScroll) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
      }
    }
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  }, []);

  useEffect(() => {
    // 0. Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const sceneEl = sceneRef.current;
    const s1El = s1Ref.current;
    const s2El = s2Ref.current;
    const s1Headline = s1HeadlineRef.current;
    const s2Headline = s2HeadlineRef.current;
    const s2Content = s2ContentRef.current;
    const decorEl = decorRef.current;
    const scrollCue = scrollCueRef.current;

    if (!sceneEl || !s1El || !s2El) return;

    if (isReducedMotionRef.current) {
      // Reduced motion: simple fade stack, no pin, no gate
      gsap.set([s1El, s2El], { opacity: 1, pointerEvents: 'auto', position: 'relative' });
      gsap.set([s1Headline, s2Headline, s2Content], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Configure ScrollTrigger for mobile URL bar stability
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Helper functions for strict gate
    const getMaxSceneScroll = () => {
      const top = sceneEl.offsetTop;
      const height = sceneEl.offsetHeight;
      const vh = window.innerHeight;
      return Math.max(0, top + height - vh);
    };

    const activateGate = () => {
      isGatedRef.current = true;
      if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
      if (gateHardCapTimeoutRef.current) clearTimeout(gateHardCapTimeoutRef.current);

      // Gate for 700ms (swallows downward momentum)
      gateTimeoutRef.current = setTimeout(() => {
        isGatedRef.current = false;
      }, 700);

      // Hard cap 1.2s (never trap the user)
      gateHardCapTimeoutRef.current = setTimeout(() => {
        isGatedRef.current = false;
      }, 1200);
    };

    const releaseGate = () => {
      isGatedRef.current = false;
      if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
      if (gateHardCapTimeoutRef.current) clearTimeout(gateHardCapTimeoutRef.current);
    };

    // Create the master scrubbed timeline
    // Timeline duration: 1.0 total normalized progress
    // 0.00 - 0.10: S1 hold (10%)
    // 0.10 - 0.65: Transition from S1 to S2
    // 0.65 - 1.00: DWELL (S2 fully visible, static, absorbs fling momentum)
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'none' }
    });
    timelineRef.current = tl;

    // Initial states
    gsap.set(s1Headline, { opacity: 1, scale: 1, filter: 'blur(0px)' });
    gsap.set(scrollCue, { opacity: 1, y: 0 });
    gsap.set(decorEl, { opacity: 1, scale: 1 });
    gsap.set(s2El, { opacity: 0, pointerEvents: 'none' });
    gsap.set(s2Headline, { opacity: 0, y: 18, scale: 0.96 });
    gsap.set(s2Content, { opacity: 0, y: 22 });

    // Step 1: Hold S1 for the first 10%
    tl.to({}, { duration: 0.1 }, 0);

    // Step 2: S1 Scroll cue fades out fast
    tl.to(scrollCue, {
      opacity: 0,
      y: 12,
      duration: 0.12,
      ease: 'power1.out'
    }, 0.08);

    // Step 3: S1 Confusion headline untangles & blurs out
    tl.to(s1Headline, {
      opacity: 0,
      scale: 1.03,
      filter: 'blur(4px)',
      duration: 0.32,
      ease: 'power2.inOut'
    }, 0.12);

    // Step 4: Document chaos decor elements disperse & fade out
    tl.to(decorEl, {
      opacity: 0,
      scale: 0.94,
      duration: 0.3,
      ease: 'power2.inOut'
    }, 0.12);

    // Hide S1 interaction and enable S2 interaction
    tl.set(s1El, { pointerEvents: 'none' }, 0.45);
    tl.set(s2El, { opacity: 1, pointerEvents: 'auto' }, 0.45);

    // Step 5: S2 Clarity headline ("Oh. Now I get it.") fades & scales into focus
    tl.to(s2Headline, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.38);

    // Step 6: S2 Paragraph, Buttons, and Trust Checklist settle in
    tl.to(s2Content, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: 'power2.out'
    }, 0.44);

    // Step 7: DWELL zone (0.65 to 1.00)
    // S2 is 100% visible, completely stationary for the remaining ~80svh
    tl.to({}, { duration: 0.35 }, 0.65);

    // Attach ScrollTrigger with scrub smoothing (0.8s catch-up)
    const st = ScrollTrigger.create({
      trigger: sceneEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      animation: tl,
      onUpdate: (self) => {
        const progress = self.progress;

        // Strict momentum gate logic:
        // When progress reaches dwell zone moving downward with high velocity:
        if (progress >= 0.98 && self.direction > 0 && Math.abs(self.getVelocity()) > 300) {
          if (!isGatedRef.current) {
            activateGate();
          }
        }
      }
    });
    scrollTriggerRef.current = st;

    // Strict Gate Wheel Listener (Swallow downward fling at end of S2, never block upward or slow scroll)
    const handleWheel = (e) => {
      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // 1. If user scrolls UP, immediately unlock gate
      if (e.deltaY < 0) {
        releaseGate();
        return;
      }

      // 2. Fresh gesture detection: if user paused for >= 150ms, release any active gate
      if (timeSinceLastWheel >= 150 && isGatedRef.current) {
        releaseGate();
      }

      // 3. If currently gated and user is trying to scroll DOWN further:
      if (isGatedRef.current && e.deltaY > 0) {
        e.preventDefault();
        return false;
      }

      // 4. Intercept fast fling coming from above that would overshoot past the scene:
      const maxScroll = getMaxSceneScroll();
      const currentScroll = window.scrollY;

      if (currentScroll < maxScroll - 8 && e.deltaY > 0) {
        const isFastFling = e.deltaY > 160 || Math.abs(e.deltaY) >= 1000;
        if (isFastFling && currentScroll + e.deltaY >= maxScroll) {
          e.preventDefault();
          window.scrollTo({ top: maxScroll, behavior: 'auto' });
          activateGate();
          return false;
        }
      }
    };

    // Keyboard Gate Handler (Space, PageDown, Down Arrow)
    const handleKeyDown = (e) => {
      const isDownKey = ['ArrowDown', 'PageDown', ' '].includes(e.key);
      const isUpKey = ['ArrowUp', 'PageUp', 'Home'].includes(e.key);

      if (isUpKey) {
        releaseGate();
        return;
      }

      if (isDownKey) {
        const maxScroll = getMaxSceneScroll();
        const currentScroll = window.scrollY;

        // If inside hero scene and key would overshoot maxScroll:
        if (currentScroll < maxScroll - 8 && currentScroll + window.innerHeight * 0.85 >= maxScroll) {
          e.preventDefault();
          window.scrollTo({ top: maxScroll, behavior: 'smooth' });
          activateGate();
          return;
        }

        if (isGatedRef.current) {
          e.preventDefault();
          return;
        }
      }
    };

    // Touch start releases any gate immediately
    const handleTouchStart = () => {
      releaseGate();
    };

    // Anchor click listener: bypass gate and jump immediately to target
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        releaseGate();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            jumpToEndState();
            target.scrollIntoView({ behavior: 'smooth' });
          } else {
            jumpToEndState();
          }
        }
      }
    };

    // Handle hash change if navigating via URL anchors
    const handleHashChange = () => {
      jumpToEndState();
    };

    // If initial URL has a hash, jump straight to end state
    if (window.location.hash) {
      jumpToEndState();
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'auto' });
        }, 50);
      }
    }

    // Mid-scene reload & history restoration
    const savedScroll = sessionStorage.getItem('hmm_hero_scroll');
    if (savedScroll) {
      const pos = parseInt(savedScroll, 10);
      sessionStorage.removeItem('hmm_hero_scroll');
      window.scrollTo(0, pos);
      ScrollTrigger.refresh();
    }

    const handleBeforeUnload = () => {
      if (window.scrollY > 0) {
        sessionStorage.setItem('hmm_hero_scroll', window.scrollY.toString());
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);

    // Refresh ScrollTrigger when web fonts are ready and on resize/orientation change
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
      if (gateHardCapTimeoutRef.current) clearTimeout(gateHardCapTimeoutRef.current);
      if (st) st.kill();
      if (tl) tl.kill();
    };
  }, [jumpToEndState]);

  // Handle focus into S2 to ensure keyboard accessibility
  const handleS2Focus = () => {
    jumpToEndState();
  };

  return (
    <section
      ref={sceneRef}
      id="hero-scene"
      className="hero-scene-container"
      aria-label="Introduction to Hmm"
    >
      {/* 100svh Sticky Stage holding S1, S2 and the Document Chaos Decor */}
      <div ref={stageRef} className="hero-pinned-viewport">
        {/* Document Chaos Layer (10-12 decor elements, balanced behind/around headline) */}
        <div
          ref={decorRef}
          id="hero-decor"
          className="hero-doc-textures"
          aria-hidden="true"
        >
          {/* 1. Stamp top-left (Original) */}
          <div className="hero-stamp hero-stamp--notice decor-drift-1">
            <span>OFFICIAL NOTICE — PENDING JURISDICTION</span>
            <div className="hero-stamp-sub">SEC 148-B / STATUTORY DEFAULT</div>
          </div>

          {/* 2. Red-bar quote (Original) */}
          <div className="hero-clause-highlight decor-drift-2">
            WHEREAS default has accrued under subsection 13(2)...
          </div>

          {/* 3. Stamp bottom-right (Original) */}
          <div className="hero-stamp hero-stamp--pathology decor-drift-3">
            <span>CLINICAL PATHOLOGY — ABNORMAL</span>
            <div className="hero-stamp-sub">REF: METABOLIC DYSFUNCTION</div>
          </div>

          {/* 4. Mini Lab Report Table */}
          <div className="hero-decor-card hero-decor--lab decor-drift-1">
            <div className="decor-card-title">SERUM BIOCHEMISTRY (FASTING)</div>
            <div className="decor-table-row">
              <span>HbA1c Glycated:</span>
              <strong className="text-flag-red">9.4% [HIGH]</strong>
            </div>
            <div className="decor-table-row">
              <span>FPG Glucose:</span>
              <strong className="text-flag-red">186 mg/dL [CRITICAL]</strong>
            </div>
            <div className="decor-table-row">
              <span>Urine Albumin:</span>
              <strong className="text-flag-red">145 mg/g [ABNORMAL]</strong>
            </div>
          </div>

          {/* 5. Prescription Scrap */}
          <div className="hero-decor-card hero-decor--rx decor-drift-2">
            <div className="decor-card-title">Rx CLINICAL PRESCRIPTION</div>
            <div className="decor-rx-line">Tab. Metformin HCl 500mg 1-0-1 × 5d ac</div>
            <div className="decor-rx-line">Tab. Atorvastatin 20mg PO qhs (x 30d)</div>
            <div className="decor-rx-line">Tab. Sorbitrate 5mg Sublingual SOS</div>
          </div>

          {/* 6. Tax / Demurrage Impost Excerpt */}
          <div className="hero-decor-card hero-decor--tax decor-drift-3">
            <span className="decor-tag-alert">DEMURRAGE IMPOST</span>
            <div className="decor-tax-amount">INR 14,250.00 DUE WARD 42-B</div>
            <div className="decor-tax-sub">DISTRESS WARRANT ATTACHMENT PROCEEDING</div>
          </div>

          {/* 7. Utility Disconnection Line */}
          <div className="hero-decor-strip decor-drift-1">
            <span>⚡ DISCONNECTION NOTICE: 48-HR DEFAULT CLAUSE ENFORCED</span>
          </div>

          {/* 8. Short Tamil Jargon Snippet (Grammatically verified) */}
          <div className="hero-decor-card hero-decor--tamil decor-drift-2">
            <div className="decor-card-lang">தமிழ் நோட்டீஸ்</div>
            <div className="decor-regional-text">வருவாய் வசூல் மற்றும் அபராத ஆணை பிரிவு 148(B)</div>
            <span className="decor-stamp-small">[உடனடி நடவடிக்கை]</span>
          </div>

          {/* 9. Short Hindi Jargon Snippet (Grammatically verified) */}
          <div className="hero-decor-card hero-decor--hindi decor-drift-3">
            <div className="decor-card-lang">शासकीय सूचना</div>
            <div className="decor-regional-text">राजस्व मांग एवं शास्ति अधिरोपण सूचना धारा 13(2)</div>
            <span className="decor-stamp-small">[दंडात्मक कार्यवाही]</span>
          </div>

          {/* 10. Hand-drawn Red Annotations SVG */}
          <svg className="hero-annotations-svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Red circle over Section clause */}
            <ellipse cx="260" cy="220" rx="90" ry="32" stroke="#A63A2E" strokeWidth="2.5" fill="none" strokeDasharray="6 3" opacity="0.65" transform="rotate(-3, 260, 220)" />
            {/* Question mark */}
            <path d="M 230 140 Q 255 120 270 140 Q 285 160 260 175 L 260 190 M 260 205 L 260 210" stroke="#A63A2E" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
            {/* Red underline */}
            <path d="M 450 380 Q 550 370 650 385" stroke="#A63A2E" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M 720 460 Q 745 440 760 460 Q 775 480 750 495 L 750 510 M 750 525 L 750 530" stroke="#A63A2E" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
          </svg>

          {/* Dashed divider lines */}
          <div className="hero-clause-line hero-clause-line--top"></div>
          <div className="hero-clause-line hero-clause-line--bot"></div>
        </div>

        {/* SECTION 1 (S1) = CONFUSION STATE */}
        <div
          ref={s1Ref}
          id="hero-s1"
          data-section="s1"
          className="hero-state-wrapper hero-state--s1"
        >
          <div className="container hero-content-stage">
            {/* Eyebrow */}
            <div className="section-kicker">
              <Sparkles size={14} className="kicker-icon" aria-hidden="true" />
              <span>Document Clarity Engine</span>
            </div>

            {/* S1 Headline in GREY */}
            <div ref={s1HeadlineRef} className="hero-s1-headline-box">
              <h1 className="hero-headline hero-headline--confusion">
                “Hmm... what does this even mean?”
              </h1>
              <div className="hero-scan-marker-wrap">
                <span className="hero-scan-marker">§ 148(B) r/w 13(2) [PENAL]</span>
              </div>
            </div>

            {/* Scroll cue at bottom of S1 */}
            <div ref={scrollCueRef} className="hero-scroll-cue" aria-hidden="true">
              <span className="scroll-cue-text">Scroll to decode it</span>
              <div className="scroll-cue-chevron">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 (S2) = CLARITY STATE */}
        <div
          ref={s2Ref}
          id="hero-s2"
          data-section="s2"
          className="hero-state-wrapper hero-state--s2"
          onFocus={handleS2Focus}
        >
          <div className="container hero-content-stage">
            {/* Same Eyebrow */}
            <div className="section-kicker">
              <Sparkles size={14} className="kicker-icon" aria-hidden="true" />
              <span>Document Clarity Engine</span>
            </div>

            {/* S2 Headline in DARK */}
            <h1 ref={s2HeadlineRef} className="hero-headline hero-headline--clarity">
              “Oh. Now I get it.”
            </h1>

            {/* Paragraph, CTAs, and 3 Check items */}
            <div ref={s2ContentRef} className="hero-s2-content-block">
              <p className="hero-subhead">
                Hmm turns confusing government notices, medical reports, and prescriptions into
                plain language you can read or hear — in your own language.
              </p>

              <div className="hero-cta-group">
                <a
                  href="#try-hmm"
                  className="btn-clarity btn-clarity--hero"
                  onClick={jumpToEndState}
                >
                  <FileText size={18} aria-hidden="true" />
                  <span>Try it with a document</span>
                </a>

                <a
                  href="#how-it-works"
                  className="btn-ghost"
                  onClick={jumpToEndState}
                >
                  <span>See how it works</span>
                </a>
              </div>

              {/* Three Check items */}
              <div className="hero-trust-bar">
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
                  <span>Zero legal or medical jargon</span>
                </div>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
                  <span>Spoken aloud in Tamil, Hindi &amp; 6 more</span>
                </div>
                <div className="hero-trust-item">
                  <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
                  <span>Concrete "what to do next" action card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
