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
      '~28% forecast accuracy improvement across 150+ brands via ensemble methods and demand normalization.',
      'Claude-based knowledge assistant enabling 80%+ self-serve troubleshooting for platform issues.',
      'Cross-functional forecasting workstreams — mentoring, stakeholder alignment, forecast adoption.',
    ],
  },
  {
    company: 'Sigmoid',
    role: 'Associate Lead Data Scientist',
    period: 'Feb 2021 — Oct 2025',
    highlights: [
      'Enterprise GenAI chatbot — OCR, RAG, document intelligence; ~$55K LLM cost savings.',
      'Forecasting for 70+ pharma products; outperformed Amazon Forecast by 10–30%.',
      'Supply chain MILP optimizers, D2C analytics (~20% MAPE), campaign optimization (~15% uplift).',
    ],
  },
  {
    company: 'BytesCare',
    role: 'Associate',
    period: 'Jul 2019 — Jan 2021',
    highlights: [
      'Scaled startup building piracy tracking and copyright automation products.',
      'Led product design, technical architecture, and Node.js automation pipelines.',
    ],
  },
];

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out' });
        },
      });
    });
  }, []);

  return (
    <section id="experience" className="section-pad bg-cream border-t border-ink/8">
      <div className="section-container">
        <div ref={headerRef} className="opacity-0 mb-16">
          <p className="text-eyebrow">Experience</p>
          <h2 className="mt-4 font-display text-display-lg text-ink">Where I&apos;ve built.</h2>
        </div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="opacity-0 editorial-card !p-7 md:!p-9"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div>
                  <h3 className="font-display text-[26px] text-ink">{exp.company}</h3>
                  <p className="mt-1 text-[16px] font-medium text-ink/75">{exp.role}</p>
                </div>
                <p className="text-meta shrink-0">{exp.period}</p>
              </div>
              <ul className="mt-6 space-y-2.5">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-body text-[15px]">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
