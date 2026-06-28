import { useEffect, useRef, useState } from 'react';

interface Stage {
  id: string;
  title: string;
  detail: string;
  tech: string;
}

const STAGES: Stage[] = [
  {
    id: 'ingest',
    title: 'Ingestion',
    detail: 'Multi-source demand, pricing, macro & climate feeds normalized into a unified panel.',
    tech: 'Snowflake · Airflow',
  },
  {
    id: 'features',
    title: 'Feature Store',
    detail: '30+ exogenous signals, lags, rolling stats and demand-deseasonalization.',
    tech: 'Pandas · Feast-style',
  },
  {
    id: 'models',
    title: 'Ensemble Models',
    detail: 'Prophet, SARIMA & LightGBM blended with learned weights per series.',
    tech: 'Prophet · LightGBM',
  },
  {
    id: 'backtest',
    title: 'Backtesting / Eval',
    detail: 'Rolling-origin CV with pinball + MAPE; confidence intervals calibrated.',
    tech: 'Custom loss · CV',
  },
  {
    id: 'serve',
    title: 'Serving / Monitor',
    detail: 'Iterative forecast releases with drift detection and accuracy tracking.',
    tech: 'API · Monitoring',
  },
];

export default function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-stretch">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex flex-col lg:flex-row lg:items-stretch flex-1">
            <button
              onMouseEnter={() => setActive(stage.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(stage.id)}
              onBlur={() => setActive(null)}
              className={`group relative flex-1 text-left rounded-xl border p-4 transition-all duration-500 ${
                active === stage.id
                  ? 'border-amber/70 bg-amber/[0.06]'
                  : 'border-text-light/10 bg-dark-mid/40 hover:border-amber/40'
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, border-color 0.3s, background-color 0.3s`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-mono-label text-amber">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-body font-semibold text-text-light text-sm">
                  {stage.title}
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.5] text-muted-text">{stage.detail}</p>
              <div className="mt-3 text-mono-label text-text-light/50">{stage.tech}</div>
            </button>

            {/* connector arrow (hidden after last) */}
            {i < STAGES.length - 1 && (
              <div className="flex items-center justify-center px-1 py-2 lg:py-0">
                <span className="text-amber/60 text-lg rotate-90 lg:rotate-0">→</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
