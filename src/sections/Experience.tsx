import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'o9 Solutions',
    role: 'Senior Data Scientist',
    period: 'Nov 2025 — Present',
    highlights: [
      'Delivered ~28% average forecast accuracy improvement across 150+ brands using ensemble methods (Prophet, SARIMA, LightGBM) and demand normalization.',
      'Designed a Claude-based internal knowledge assistant with a curated domain corpus, cutting new user ramp-up time and enabling self-serve troubleshooting for 80%+ of common platform issues.',
      'Drove cross-functional forecasting workstreams end-to-end, mentoring junior team members and ensuring consistent forecast adoption across business units.',
    ],
    metric: '28% accuracy uplift',
  },
  {
    company: 'Sigmoid',
    role: 'Associate Lead Data Scientist',
    period: 'Feb 2021 — Oct 2025',
    highlights: [
      'Led enterprise GenAI chatbot delivery — OCR, document classification, and summarization pipelines with RAG architectures saving ~$55K in LLM costs.',
      'Architected forecasting systems for 70+ pharmaceutical products across US & Japan, outperforming Amazon Forecast by 10–30% across confidence intervals.',
      'Built supply chain MILP optimizers, D2C predictive models (~20% MAPE), and Amazon campaign optimization delivering ~15% revenue uplift.',
    ],
    metric: '6 yrs · 2 promotions',
  },
  {
    company: 'BytesCare',
    role: 'Associate',
    period: 'Jul 2019 — Jan 2021',
    highlights: [
      'Scaled a startup building products to track piracy and automate copyright infringement reporting.',
      'Led product design and technical architecture while driving competitor analysis and market intelligence for sales and pricing strategy.',
      'Developed Node.js automation pipelines for email ingestion, classification, and copyright response tracking.',
    ],
    metric: 'Innovation venture',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const triggers: ScrollTrigger[] = [];

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power3.out',
            }
          );
        },
        once: true,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative w-full bg-light py-32">
      <div className="section-container">
        <div ref={headerRef} className="mb-20 opacity-0">
          <span className="text-eyebrow">Career</span>
          <h2 className="mt-4 font-display text-display-lg text-dark leading-[1.1] tracking-[-0.01em]">
            Professional Experience
          </h2>
          <div className="mt-6 hairline-light" />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-dark/10 hidden sm:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="opacity-0 relative sm:pl-20"
              >
                <div className="absolute left-2.5 md:left-6 top-8 hidden sm:flex h-4 w-4 items-center justify-center">
                  <span className="h-3 w-3 rounded-full bg-amber ring-4 ring-light" />
                </div>

                <div className="surface-card-light p-8 md:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-amber/30">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="font-display text-display-md text-dark leading-[1.2]">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-body font-medium text-dark/80">{exp.role}</p>
                      <p className="mt-1 text-mono-label text-muted-text">{exp.period}</p>
                    </div>
                    <span className="inline-flex self-start rounded-full bg-amber/10 px-4 py-1.5 text-mono-label font-semibold text-amber">
                      {exp.metric}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {exp.highlights.map((item, j) => (
                      <li key={j} className="flex gap-3 text-body text-dark/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
