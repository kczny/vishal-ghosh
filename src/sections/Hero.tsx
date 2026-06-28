import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      photoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 },
      0.1
    )
      .fromTo(
        labelRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.45
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        0.65
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        0.85
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        1.1
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dark">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark/85"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-6 py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16">
          {/* Profile Photo */}
          <div ref={photoRef} className="opacity-0 shrink-0">
            <div className="relative">
              <div className="h-36 w-36 sm:h-40 sm:w-40 lg:h-44 lg:w-44 rounded-2xl overflow-hidden ring-2 ring-amber/40 ring-offset-2 ring-offset-dark shadow-glass">
                <img
                  src="/images/profile.png"
                  alt="Vishal Ghosh"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div
                ref={badgeRef}
                className="opacity-0 absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full px-3 py-1.5 bg-dark-mid/80 backdrop-blur-md border border-text-light/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="text-label text-text-light whitespace-nowrap">o9 Solutions</span>
              </div>
            </div>
          </div>

          {/* Text Stack */}
          <div className="flex-1 text-center lg:text-left">
            <div ref={labelRef} className="opacity-0 mb-4">
              <span className="text-label text-muted-text tracking-[0.02em]">
                Senior Data Scientist &middot; AI Leader &middot; IIT (BHU)
              </span>
            </div>

            <h1
              ref={titleRef}
              className="opacity-0 font-display text-display-xl text-text-light leading-[1.05] tracking-[-0.02em]"
            >
              Vishal Ghosh
              <br />
              <em className="italic text-amber-light">Architecting Intelligence</em>
            </h1>

            <p
              ref={descRef}
              className="opacity-0 mt-6 text-body text-muted-text max-w-[540px] mx-auto lg:mx-0"
            >
              I engineer AI systems that move businesses forward — from GenAI architectures and
              demand forecasting engines to supply chain optimizers that balance profit with
              planetary cost.
            </p>

            <div ref={ctaRef} className="opacity-0 flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <button
                onClick={scrollToProjects}
                className="rounded-full bg-amber px-8 py-[14px] text-label font-semibold text-dark tracking-[0.04em] hover:bg-amber-light hover:scale-105 transition-all duration-300"
              >
                View My Work
              </button>
              <a
                href="/Vishal-Ghosh-Resume-2026.pdf"
                download="Vishal-Ghosh-Resume-2026.pdf"
                className="rounded-full border border-text-light/20 px-8 py-[14px] text-label font-semibold text-text-light tracking-[0.04em] hover:border-amber transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into light section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none bg-gradient-to-b from-transparent to-light"
        aria-hidden="true"
      />
    </section>
  );
}
