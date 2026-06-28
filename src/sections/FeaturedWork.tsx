import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ForecastChart from '../components/ForecastChart';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const caseStudies = [
  {
    id: 'forecasting',
    tags: ['Ensemble ML', 'Production', 'Private R&D'],
    title: 'The Forecasting Engine',
    subtitle: 'Turning noisy demand into calibrated predictions',
    description:
      'A production-grade ensemble system blending Prophet, SARIMA, and LightGBM with 30+ exogenous signals and rolling-origin backtesting. Delivered ~28% accuracy improvement across 150+ brands at o9 Solutions — and consistently outperformed Amazon Forecast by 10–30% in prior pharma deployments.',
    meta: 'o9 Solutions · Flagship R&D · 2025–26',
    featured: true,
  },
  {
    id: 'genai',
    tags: ['GenAI', 'RAG', 'Document Intelligence'],
    title: 'Enterprise GenAI Chatbot',
    subtitle: 'From documents to decisions at scale',
    description:
      'Led cross-functional delivery of an enterprise GenAI chatbot — OCR, document classification, and summarization pipelines. Architected open-source OCR workflows saving ~$55K in LLM costs, integrated Vision Transformers, and fine-tuned Hugging Face models for document intelligence.',
    meta: 'Sigmoid · 2022–25',
    featured: false,
  },
  {
    id: 'supply-chain',
    tags: ['Optimization', 'MILP', 'Sustainability'],
    title: 'Supply Chain Logistics Optimizer',
    subtitle: 'Profit and planet in the same objective function',
    description:
      'Designed an optimization framework consolidating LTL shipments into FTL over configurable horizons — optimizing trade terms, carbon emissions, and cost via Mixed Integer Linear Programming. Built a custom PyShiny decision-support tool from scratch.',
    meta: 'Sigmoid · 2023–24',
    featured: false,
  },
];

export default function FeaturedWork() {
  const headerRef = useScrollAnimation<HTMLDivElement>('fadeUp');
  const [expanded, setExpanded] = useState<string | null>('forecasting');

  return (
    <section id="work" className="section-pad bg-cream">
      <div className="section-container">
        <div ref={headerRef} className="opacity-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-eyebrow">Featured work</p>
            <h2 className="mt-4 font-display text-display-lg text-ink">
              Three case studies, told in full.
            </h2>
          </div>
          <button
            onClick={() => document.getElementById('also')?.scrollIntoView({ behavior: 'smooth' })}
            className="link-arrow shrink-0"
          >
            More projects <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {caseStudies.map((study) => {
            const isOpen = expanded === study.id;
            return (
              <article
                key={study.id}
                className="editorial-card group cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : study.id)}
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  {study.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-display-md text-ink group-hover:text-accent transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="mt-2 text-[17px] font-medium text-ink/70">{study.subtitle}</p>

                <p className="mt-5 text-body max-w-[720px]">{study.description}</p>

                <p className="mt-6 text-meta">{study.meta}</p>

                {study.id === 'forecasting' && isOpen && (
                  <div className="mt-10 pt-10 border-t border-ink/10" onClick={(e) => e.stopPropagation()}>
                    <p className="text-mono-label text-ink-muted mb-4">
                      Interactive demo · synthetic data · toggle models below
                    </p>
                    <div className="rounded-xl overflow-hidden border border-ink/10 bg-ink text-text-light">
                      <ForecastChart />
                    </div>
                    <p className="mt-4 text-meta">
                      Private R&D in active development — insights only, no proprietary code exposed.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                  {isOpen ? 'Collapse' : 'Read more'}
                  <ArrowRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
