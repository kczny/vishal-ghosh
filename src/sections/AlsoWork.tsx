import { useScrollAnimation } from '../hooks/useScrollAnimation';

const alsoItems = [
  {
    title: 'Claude Knowledge Assistant',
    category: 'GenAI · Internal Tools',
    description: 'Curated domain corpus enabling 80%+ self-serve troubleshooting for platform issues.',
  },
  {
    title: 'Brand Matching Engine',
    category: 'Computer Vision · NLP',
    description: 'CNN-based model achieving 93% top-3 brand recognition in product reviews.',
  },
  {
    title: 'D2C Analytics Platform',
    category: 'Predictive Analytics',
    description: '~20% MAPE forecasting ~600 products (>$50M revenue); SHAP-driven feature reduction.',
  },
  {
    title: 'Amazon Campaign Optimization',
    category: 'Marketing Analytics',
    description: '~15% revenue uplift across 100 ad campaigns via ROAS modeling and keyword ranking.',
  },
];

export default function AlsoWork() {
  const ref = useScrollAnimation<HTMLDivElement>('fadeUp');

  return (
    <section id="also" className="section-pad bg-cream-dark/40 border-t border-ink/8">
      <div className="section-container">
        <div ref={ref} className="opacity-0">
          <p className="text-eyebrow">Also — deep dives &amp; analyses</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {alsoItems.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-ink/10 bg-white/50 p-6 transition-all duration-400 hover:bg-white hover:border-ink/20 hover:shadow-[0_12px_40px_-16px_rgba(28,25,23,0.12)]"
              >
                <p className="text-mono-label text-accent">{item.category}</p>
                <h3 className="mt-3 font-display text-[22px] text-ink leading-snug group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-body text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
