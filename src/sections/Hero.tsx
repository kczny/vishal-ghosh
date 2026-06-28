import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.2
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.4
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        0.6
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        0.9
      )
      .fromTo(
        portalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.4 },
        0.5
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
    <section className="relative min-h-[100dvh] flex items-center bg-[#110F0F] overflow-hidden">
      <div className="mx-auto max-w-[1200px] w-full px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left Column */}
        <div className="flex-1 lg:max-w-[55%] z-10">
          <div ref={labelRef} className="opacity-0 mb-6">
            <span className="text-sm font-medium text-[#888888] tracking-[0.02em]">
              Senior Data Scientist &middot; AI Leader &middot; Based in India
            </span>
          </div>

          <h1
            ref={titleRef}
            className="opacity-0 font-serif text-[#EAEAEA] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(48px, 8vw, 112px)' }}
          >
            Architecting
            <br />
            <em className="italic text-[#EAEAEA]">Intelligence</em>
          </h1>

          <p
            ref={descRef}
            className="opacity-0 mt-8 text-[15px] leading-[1.6] text-[#888888] max-w-[480px]"
          >
            I engineer AI systems that move businesses forward — from GenAI architectures and demand
            forecasting engines to supply chain optimizers that balance profit with planetary cost.
          </p>

          <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4 mt-10">
            <button
              onClick={scrollToProjects}
              className="rounded-full bg-[#E48A18] px-8 py-[14px] text-sm font-semibold text-[#110F0F] tracking-[0.04em] hover:bg-[#F5AF4B] hover:scale-105 transition-all duration-300"
            >
              View My Work
            </button>
            <button className="rounded-full border border-[rgba(234,234,234,0.2)] px-8 py-[14px] text-sm font-semibold text-[#EAEAEA] tracking-[0.04em] hover:border-[#E48A18] transition-all duration-300">
              Download CV
            </button>
          </div>
        </div>

        {/* Right Column — Video Portal */}
        <div className="flex-1 lg:max-w-[45%] flex justify-center lg:justify-end z-10">
          <div
            ref={portalRef}
            className="opacity-0 relative animate-float"
            style={{ maxHeight: '65vh' }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: '9/16',
                maxHeight: '65vh',
                width: 'auto',
                boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                style={{ maxHeight: '65vh' }}
              >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Floating Status Badge */}
            <div
              className="absolute -left-5 bottom-10 flex items-center gap-3 rounded-full px-4 py-2"
              style={{
                background: 'rgba(30, 30, 30, 0.5)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E48A18] opacity-75"
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E48A18]" />
              </span>
              <span className="text-xs text-[#EAEAEA] font-medium whitespace-nowrap">
                Currently at o9 Solutions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom for transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F7F7F7)',
        }}
      />
    </section>
  );
}
