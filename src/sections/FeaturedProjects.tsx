import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataStream from '../components/DataStream';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: 'GenAI · Computer Vision · NLP',
    title: 'Enterprise GenAI Chatbot',
    description:
      'Led cross-functional teams in delivering an enterprise-grade GenAI chatbot overseeing OCR, document classification, and summarization pipelines. Architected open-source OCR workflows saving ~$55K in LLM costs, integrated Vision Transformers, and fine-tuned Hugging Face models for document intelligence.',
    metric: '~$55K cost savings',
  },
  {
    tag: 'GenAI · RAG · Knowledge Systems',
    title: 'Claude Knowledge Assistant',
    description:
      'Designed a Claude-based internal knowledge assistant using a curated domain corpus (platform docs, IBPL queries, forecasting use cases), cutting new user ramp-up time and enabling self-serve troubleshooting for 80%+ of common platform issues.',
    metric: '80%+ self-serve resolution',
  },
  {
    tag: 'Time-Series · Ensemble Modeling · Prophet · LSTM',
    title: 'Global Demand Forecasting Engine',
    description:
      'Directed the design and deployment of enterprise-grade forecasting systems integrating Prophet, LSTM, XGBoost, and ARIMA to deliver real-time demand predictions for 70+ pharmaceutical products across US and Japan. Consistently outperformed Amazon Forecast by 10–30% across confidence intervals.',
    metric: '70+ products · 10–30% improvement',
  },
  {
    tag: 'Deep Learning · CNN · NLP',
    title: 'Brand Matching Engine',
    description:
      'Led the transformation of brand identification in product reviews by replacing manual hand-matching with a custom CNN-based model, achieving 93% accuracy in top-3 brand recognition. Established rigorous baselines using Jaccard, Cosine, and Record Linkage metrics.',
    metric: '93% top-3 accuracy',
  },
  {
    tag: 'Optimization · MILP · PyShiny · Sustainability',
    title: 'Supply Chain Logistics Optimizer',
    description:
      'Designed and deployed an optimization framework to consolidate LTL shipments into FTL over configurable time horizons, optimizing for trade term benefits, carbon emissions, and shipment costs using Mixed Integer Linear Programming. Built a custom PyShiny decision-support tool from scratch.',
    metric: 'Carbon + Cost optimized',
  },
  {
    tag: 'Predictive Analytics · D2C · Media Mix',
    title: 'D2C Analytics Platform',
    description:
      'Developed advanced predictive models to forecast sales of ~600 products (>$50M revenue), achieving ~20% MAPE. Designed media mix simulations to quantify channel impact on AOV, traffic, and conversions, and reduced ~150 features to 60 key drivers using SHAP analysis.',
    metric: '~20% MAPE · $50M+ revenue',
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
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
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
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-dark"
      style={{ minHeight: '200vh' }}
    >
      <div
        className="absolute inset-0 overflow-hidden opacity-20 mix-blend-screen"
        aria-hidden="true"
      >
        <DataStream />
      </div>

      <div className="relative z-10 section-container py-32 max-w-[900px]">
        <div ref={headerRef} className="mb-24 opacity-0">
          <span className="text-label font-medium text-amber tracking-[0.02em]">Work</span>
          <h2 className="mt-4 font-display text-display-lg text-text-light leading-[1.1] tracking-[-0.01em]">
            Featured Projects
          </h2>
          <div className="mt-6 h-px w-full bg-text-light/10" />
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="opacity-0 glass-card p-8 md:p-12"
            >
              <span className="text-label font-medium text-amber tracking-[0.02em]">
                {project.tag}
              </span>

              <h3 className="mt-4 font-display text-display-md text-text-light leading-[1.2]">
                {project.title}
              </h3>

              <p className="mt-4 text-body text-muted-text">{project.description}</p>

              <div className="mt-8 font-body font-semibold text-amber leading-none tracking-[-0.02em] text-display-md">
                {project.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
