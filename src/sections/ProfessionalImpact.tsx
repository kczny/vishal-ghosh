import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel3D from '../components/Carousel3D';
import CountUpStat from '../components/CountUpStat';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { end: 6, suffix: '+', label: 'Years of Experience' },
  { end: 150, suffix: '+', label: 'Brands Impacted' },
  { end: 30, suffix: '+', label: 'Exogenous Signals Integrated' },
  { end: 28, suffix: '%', label: 'Forecast Accuracy Improvement' },
];

const education = [
  { degree: 'B.Tech', institute: 'IIT (BHU), Varanasi', year: '2019' },
  { degree: 'Class XII', institute: 'KIIT International School, Bhubaneswar', year: '2015' },
  { degree: 'Class X', institute: 'Delhi Public School, Jamshedpur', year: '2013' },
];

const awards = [
  'Bravo Award — Sigmoid (Quick Learner)',
  'Two promotions in under a year each for continuous outperformance',
];

export default function ProfessionalImpact() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tweens: gsap.core.Tween[] = [];

    const animateIn = (el: HTMLElement | null, trigger?: HTMLElement | null) => {
      if (!el) return;
      tweens.push(
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger ?? el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    };

    animateIn(headerRef.current);
    animateIn(metricsRef.current);

    if (metricsRef.current) {
      tweens.push(
        gsap.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    animateIn(eduRef.current);
    animateIn(carouselRef.current);

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="impact" className="relative w-full bg-light py-32">
      <div className="section-container">
        <div ref={headerRef} className="text-center opacity-0">
          <span className="text-eyebrow">By the numbers</span>
          <h2 className="mt-4 font-display text-display-lg text-dark leading-[1.1] tracking-[-0.01em]">
            Professional Impact
          </h2>
        </div>

        <div
          ref={metricsRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {metrics.map((m, i) => (
            <div key={i} className="text-center opacity-0 group">
              <div className="font-body font-semibold text-amber leading-none tracking-[-0.02em] text-display-xl">
                <CountUpStat end={m.end} suffix={m.suffix} />
              </div>
              <div className="mx-auto mt-4 h-px w-12 bg-amber/30 transition-all duration-500 group-hover:w-20" />
              <div className="mt-3 text-label font-medium text-muted-text tracking-[0.02em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div ref={eduRef} className="mt-24 opacity-0">
          <h3 className="font-display text-display-md text-dark text-center leading-[1.2]">
            Education &amp; Recognition
          </h3>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {education.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-dark/10 bg-white/60 p-6 text-center"
              >
                <div className="font-body font-semibold text-dark">{item.degree}</div>
                <div className="mt-1 text-body text-dark/70">{item.institute}</div>
                <div className="mt-2 text-label text-amber font-medium">{item.year}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {awards.map((award, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full bg-amber/10 px-5 py-2 text-label font-medium text-dark/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                {award}
              </span>
            ))}
          </div>
        </div>

        <div ref={carouselRef} className="mt-24 opacity-0">
          <Carousel3D />
        </div>
      </div>
    </section>
  );
}
