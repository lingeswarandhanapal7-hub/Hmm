import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const crampedTextRef = useRef(null);
  const resolvedTextRef = useRef(null);
  const subheadRef = useRef(null);
  const bgTexturesRef = useRef(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion for vestibular-safe transitions
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    const cramped = crampedTextRef.current;
    const resolved = resolvedTextRef.current;
    const subhead = subheadRef.current;
    const bgTextures = bgTexturesRef.current;

    if (!container || !pinTarget) return;

    // Master scroll-scrubbed timeline with responsive scrub
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: pinTarget,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            container.style.setProperty('--scrub-progress', self.progress);
          }
        }
      });

      // Initial state: cramped text visible, resolved text and subhead hidden
      gsap.set(cramped, { opacity: 1, scale: 1, transformOrigin: 'left center' });
      gsap.set(resolved, {
        opacity: 0,
        scale: mediaQuery.matches ? 1 : 0.96,
        y: mediaQuery.matches ? 0 : 14,
        transformOrigin: 'left center'
      });
      gsap.set(subhead, { opacity: 0, y: mediaQuery.matches ? 0 : 16 });
      gsap.set(bgTextures, { opacity: 0.75, scale: 1 });

      // Step 1: Cramped text untangles and releases tension
      tl.to(cramped, {
        opacity: 0,
        scale: mediaQuery.matches ? 1 : 1.02,
        letterSpacing: '-0.01em',
        duration: 0.35,
        ease: 'power1.inOut'
      }, 0);

      // Background messy document textures fade away as clarity arrives
      tl.to(bgTextures, {
        opacity: 0,
        scale: mediaQuery.matches ? 1 : 0.95,
        duration: 0.3,
        ease: 'power1.out'
      }, 0.05);

      // Step 2: "Oh. Now I get it." cross-fades in with confidence
      tl.to(resolved, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out'
      }, 0.15);

      // Step 3: Subhead and CTA buttons fade in promptly
      tl.to(subhead, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power1.out'
      }, 0.25);
    }, container);

    // Refresh ScrollTrigger after web fonts load (critical on Vercel production cold start)
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleRefresh);
    }
    window.addEventListener('load', handleRefresh);

    return () => {
      ctx.revert();
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('load', handleRefresh);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-scroll-wrapper"
      id="hero"
      aria-label="Introduction to Hmm"
    >
      <div ref={pinTargetRef} className="hero-pinned-viewport">
        {/* Faint Background Document Textures (Fades out on scroll via transform & opacity) */}
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
