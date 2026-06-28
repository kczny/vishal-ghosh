import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const metaRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(metaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.25)
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
      .fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.75);

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-cream overflow-hidden">
      {/* Subtle warm gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark/60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 section-container w-full pt-28 pb-20">
        <div className="max-w-[820px]">
          <p ref={metaRef} className="opacity-0 text-meta">
            Vishal Ghosh &middot; Senior Data Scientist &middot; Currently at o9 Solutions
          </p>

          <h1
            ref={titleRef}
            className="opacity-0 mt-8 font-display text-display-xl text-ink"
          >
            I architect intelligence out of complexity.
          </h1>

          <p ref={subRef} className="opacity-0 mt-8 text-body-lg max-w-[620px]">
            From ensemble forecasting and GenAI pipelines to supply chain optimizers — I build
            production-grade systems where rigorous modeling meets real business outcomes.
          </p>

          <p ref={tagRef} className="opacity-0 mt-6 font-display italic text-[22px] text-ink/80">
            I think in systems.
          </p>

          <div ref={ctaRef} className="opacity-0 mt-10 flex flex-wrap gap-4">
            <button onClick={() => scrollTo('work')} className="btn-primary">
              See my work
            </button>
            <button onClick={() => scrollTo('about')} className="btn-secondary">
              About me
            </button>
            <a
              href="/Vishal-Ghosh-Resume-2026.pdf"
              download="Vishal-Ghosh-Resume-2026.pdf"
              className="btn-secondary"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Profile — editorial placement */}
        <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="h-72 w-56 overflow-hidden rounded-lg shadow-[0_32px_80px_-20px_rgba(28,25,23,0.25)]">
              <img
                src="/images/profile.png"
                alt="Vishal Ghosh"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white border border-ink/10 rounded-full px-4 py-2 text-meta shadow-sm">
              IIT (BHU) &middot; 6+ yrs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
