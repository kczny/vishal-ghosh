import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel3D from '../components/Carousel3D';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '6+', label: 'Years of Experience' },
  { value: '150+', label: 'Brands Impacted' },
  { value: '30+', label: 'Exogenous Signals Integrated' },
  { value: '28%', label: 'Forecast Accuracy Improvement' },
];

export default function ProfessionalImpact() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tweens: gsap.core.Tween[] = [];

    if (headerRef.current) {
      tweens.push(
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

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

    if (carouselRef.current) {
      tweens.push(
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="impact" className="relative w-full bg-[#F7F7F7] py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <h2
          ref={headerRef}
          className="font-serif text-[#110F0F] leading-[1.1] tracking-[-0.01em] text-center opacity-0"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
        >
          Professional Impact
        </h2>

        {/* Metrics Row */}
        <div
          ref={metricsRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {metrics.map((m, i) => (
            <div key={i} className="text-center opacity-0">
              <div
                className="font-sans font-semibold text-[#E48A18] leading-[1] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
              >
                {m.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[#888888] tracking-[0.02em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3D Competency Carousel */}
        <div ref={carouselRef} className="mt-24 opacity-0">
          <Carousel3D />
        </div>
      </div>
    </section>
  );
}
