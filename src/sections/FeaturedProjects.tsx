import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataStream from '../components/DataStream';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: 'GenAI \u00B7 Computer Vision \u00B7 NLP',
    title: 'Enterprise GenAI Chatbot',
    description:
      'Led cross-functional teams in delivering an enterprise-grade GenAI chatbot overseeing OCR, document classification, and summarization pipelines. Architected open-source OCR workflows saving ~$55K in LLM costs, integrated Vision Transformers, and fine-tuned Hugging Face models for document intelligence.',
    metric: '~$55K cost savings',
  },
  {
    tag: 'Time-Series \u00B7 Ensemble Modeling \u00B7 Prophet \u00B7 LSTM',
    title: 'Global Demand Forecasting Engine',
    description:
      'Directed the design and deployment of enterprise-grade forecasting systems integrating Prophet, LSTM, XGBoost, and ARIMA to deliver real-time demand predictions for 70+ pharmaceutical products across US and Japan. Consistently outperformed Amazon Forecast by 10-30% across confidence intervals.',
    metric: '70+ products \u00B7 10-30% improvement',
  },
  {
    tag: 'Optimization \u00B7 MILP \u00B7 PyShiny \u00B7 Sustainability',
    title: 'Supply Chain Logistics Optimizer',
    description:
      'Designed and deployed an optimization framework to consolidate LTL shipments into FTL over configurable time horizons, optimizing for trade term benefits, carbon emissions, and shipment costs using Mixed Integer Linear Programming. Built a custom PyShiny decision-support tool from scratch.',
    metric: 'Carbon + Cost optimized',
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const triggers: ScrollTrigger[] = [];

    // Header sticky + fade
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

    // Cards stagger
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.15,
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
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: '200vh', background: '#110F0F' }}
    >
      {/* Data Stream Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.2, mixBlendMode: 'screen' }}
      >
        <DataStream />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-6 py-32">
        {/* Section Header */}
        <div ref={headerRef} className="mb-24 opacity-0">
          <h2
            className="font-serif text-[#EAEAEA] leading-[1.1] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Featured Projects
          </h2>
          <div className="mt-6 h-[1px] w-full bg-[rgba(234,234,234,0.1)]" />
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="opacity-0 rounded-2xl p-10 md:p-12"
              style={{
                background: 'rgba(30, 30, 30, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span className="text-sm font-medium text-[#E48A18] tracking-[0.02em]">
                {project.tag}
              </span>

              <h3 className="mt-4 font-serif text-[32px] text-[#EAEAEA] leading-[1.2]">
                {project.title}
              </h3>

              <p className="mt-4 text-[15px] leading-[1.6] text-[#888888]">
                {project.description}
              </p>

              <div
                className="mt-8 font-sans font-semibold text-[#E48A18] leading-[1] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              >
                {project.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
