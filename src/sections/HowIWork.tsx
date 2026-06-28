import { useScrollAnimation } from '../hooks/useScrollAnimation';

const postures = [
  {
    num: '01',
    title: 'Rigor',
    body: "Forecasting isn't intuition dressed up as math. I start with baselines, holdout protocols, and honest error decomposition — then iterate toward signal, not story.",
  },
  {
    num: '02',
    title: 'Systems',
    body: "A model in a notebook isn't a product. I design pipelines end-to-end — ingestion, feature stores, ensemble serving, and monitoring — so intelligence survives contact with production.",
  },
  {
    num: '03',
    title: 'Innovation',
    body: 'The best forecasting systems blend classical time-series with modern ML. I experiment with ensemble architectures, exogenous signals, and custom loss functions — then ship what works.',
  },
  {
    num: '04',
    title: 'Outcomes',
    body: "Accuracy without adoption is vanity. I align stakeholders on metrics that change decisions — forecast accuracy, inventory turns, revenue uplift — and measure honestly after launch.",
  },
];

export default function HowIWork() {
  const headerRef = useScrollAnimation<HTMLDivElement>('fadeUp');
  const gridRef = useScrollAnimation<HTMLDivElement>('stagger', { delay: 0.15 });

  return (
    <section className="section-pad bg-cream border-t border-ink/8">
      <div className="section-container">
        <div ref={headerRef} className="opacity-0 max-w-[640px]">
          <p className="text-eyebrow">How I work</p>
          <h2 className="mt-4 font-display text-display-lg text-ink">
            Four postures, not phases.
          </h2>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-2">
          {postures.map((p) => (
            <div
              key={p.num}
              className="rounded-xl border border-ink/10 bg-white/40 p-8 md:p-9 transition-colors hover:bg-white/80"
            >
              <span className="font-mono text-[13px] text-accent tracking-widest">{p.num}</span>
              <h3 className="mt-4 font-display text-[26px] text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-4 text-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
