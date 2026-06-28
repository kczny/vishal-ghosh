import { useMemo, useState } from 'react';
import DataStream from '../components/DataStream';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type Domain = 'GenAI' | 'Forecasting' | 'Optimization' | 'Computer Vision';

interface Project {
  tag: string;
  title: string;
  description: string;
  metric: string;
  domains: Domain[];
}

const projects: Project[] = [
  {
    tag: 'GenAI · Computer Vision · NLP',
    title: 'Enterprise GenAI Chatbot',
    description:
      'Led cross-functional teams delivering an enterprise-grade GenAI chatbot — OCR, document classification, and summarization pipelines. Architected open-source OCR workflows saving ~$55K in LLM costs and fine-tuned Hugging Face models for document intelligence.',
    metric: '~$55K cost savings',
    domains: ['GenAI', 'Computer Vision'],
  },
  {
    tag: 'GenAI · RAG · Knowledge Systems',
    title: 'Claude Knowledge Assistant',
    description:
      'Designed a Claude-based internal knowledge assistant using a curated domain corpus (platform docs, IBPL queries, forecasting use cases), enabling self-serve troubleshooting for 80%+ of common platform issues.',
    metric: '80%+ self-serve resolution',
    domains: ['GenAI'],
  },
  {
    tag: 'Time-Series · Ensemble · Prophet · LSTM',
    title: 'Global Demand Forecasting Engine',
    description:
      'Designed enterprise forecasting systems integrating Prophet, LSTM, XGBoost, and ARIMA for 70+ pharmaceutical products across US and Japan. Consistently outperformed Amazon Forecast by 10–30% across confidence intervals.',
    metric: '70+ products · 10–30% lift',
    domains: ['Forecasting'],
  },
  {
    tag: 'Deep Learning · CNN · NLP',
    title: 'Brand Matching Engine',
    description:
      'Replaced manual hand-matching with a custom CNN-based model, achieving 93% accuracy in top-3 brand recognition. Established rigorous baselines using Jaccard, Cosine, and Record Linkage metrics.',
    metric: '93% top-3 accuracy',
    domains: ['Computer Vision'],
  },
  {
    tag: 'Optimization · MILP · PyShiny · Sustainability',
    title: 'Supply Chain Logistics Optimizer',
    description:
      'Built an optimization framework consolidating LTL shipments into FTL over configurable horizons, optimizing trade-term benefits, carbon emissions, and cost using Mixed Integer Linear Programming, with a custom PyShiny decision-support tool.',
    metric: 'Carbon + Cost optimized',
    domains: ['Optimization'],
  },
  {
    tag: 'Predictive Analytics · D2C · Media Mix',
    title: 'D2C Analytics Platform',
    description:
      'Built predictive models forecasting sales of ~600 products (>$50M revenue) at ~20% MAPE. Designed media-mix simulations for AOV, traffic, and conversions, and reduced ~150 features to 60 key drivers using SHAP analysis.',
    metric: '~20% MAPE · $50M+ revenue',
    domains: ['Forecasting', 'Optimization'],
  },
];

const filters: ('All' | Domain)[] = ['All', 'GenAI', 'Forecasting', 'Optimization', 'Computer Vision'];

export default function FeaturedProjects() {
  const [active, setActive] = useState<'All' | Domain>('All');
  const headerRef = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.1 });

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.domains.includes(active))),
    [active]
  );

  return (
    <section id="projects" className="relative w-full bg-dark py-32">
      <div
        className="absolute inset-0 overflow-hidden opacity-[0.12] mix-blend-screen pointer-events-none"
        aria-hidden="true"
      >
        <DataStream />
      </div>

      <div className="relative z-10 section-container">
        <div ref={headerRef} className="opacity-0">
          <span className="text-eyebrow">Work</span>
          <h2 className="mt-4 font-display text-display-lg text-text-light leading-[1.1] tracking-[-0.01em]">
            Featured Projects
          </h2>
          <div className="mt-6 hairline-dark" />
        </div>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-mono-label transition-all duration-300 border ${
                  isActive
                    ? 'bg-amber text-dark border-amber font-semibold'
                    : 'bg-transparent text-muted-text border-text-light/15 hover:border-amber/60 hover:text-text-light'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.title}
              className="group surface-card-dark p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber/40"
              style={{ animation: 'fadeProj 0.5s ease' }}
            >
              <span className="text-mono-label text-amber">{project.tag}</span>

              <h3 className="mt-4 font-display text-display-md text-text-light leading-[1.2]">
                {project.title}
              </h3>

              <p className="mt-4 text-body text-muted-text">{project.description}</p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="font-body font-semibold text-amber tracking-[-0.01em] text-xl">
                  {project.metric}
                </span>
                <span className="flex gap-1.5">
                  {project.domains.map((d) => (
                    <span
                      key={d}
                      className="rounded-md border border-text-light/10 px-2 py-1 text-[10px] uppercase tracking-[0.1em] font-mono text-text-light/50"
                    >
                      {d}
                    </span>
                  ))}
                </span>
              </div>

              {/* hover accent bar */}
              <div className="mt-6 h-px w-0 bg-gradient-to-r from-amber to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeProj {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeProj { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </section>
  );
}
