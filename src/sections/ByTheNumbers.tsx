import CountUpStat from '../components/CountUpStat';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  { end: 6, suffix: '+', label: 'years in data science & AI' },
  { end: 150, suffix: '+', label: 'brands impacted at o9 Solutions' },
  { end: 28, suffix: '%', label: 'forecast accuracy improvement' },
  { end: 30, suffix: '+', label: 'exogenous signals integrated' },
];

export default function ByTheNumbers() {
  const ref = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.1 });

  return (
    <section className="section-pad bg-cream-dark/50 border-y border-ink/8">
      <div className="section-container">
        <div ref={ref} className="opacity-0">
          <p className="text-eyebrow">By the numbers</p>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-display-md text-ink tabular-nums">
                  <CountUpStat end={s.end} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-meta max-w-[180px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
