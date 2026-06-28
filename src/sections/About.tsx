import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const ref = useScrollAnimation<HTMLDivElement>('fadeUp');

  return (
    <section id="about" className="section-pad bg-cream-dark/30 border-t border-ink/8">
      <div className="section-container">
        <div ref={ref} className="opacity-0 grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="aspect-[4/5] max-w-[280px] overflow-hidden rounded-lg shadow-[0_24px_60px_-20px_rgba(28,25,23,0.2)]">
              <img
                src="/images/profile.png"
                alt="Vishal Ghosh"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div>
            <p className="text-eyebrow">A short intro</p>
            <h2 className="mt-4 font-display text-display-lg text-ink leading-[1.08]">
              From IIT (BHU) to production AI — six years building systems that ship.
            </h2>

            <div className="mt-8 space-y-5 text-body-lg">
              <p>
                I came to data science through engineering — a B.Tech from IIT (BHU) gave me the
                mathematical foundation; six years across o9 Solutions, Sigmoid, and BytesCare taught
                me what it takes to move models from notebooks into production.
              </p>
              <p>
                Today at o9 Solutions, I lead forecasting workstreams across 150+ brands — ensemble
                methods, demand normalization, and a Claude-based knowledge assistant that cuts
                ramp-up time for new users. Previously at Sigmoid, I architected GenAI pipelines,
                demand forecasting engines, and supply chain optimizers that consistently beat
                industry benchmarks.
              </p>
              <p>
                Recognized with the Bravo Award at Sigmoid and two rapid promotions for continuous
                outperformance. I combine rigorous modeling with intuitive product thinking — whether
                fine-tuning Hugging Face models or designing PyShiny decision-support tools.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {['GenAI', 'Forecasting', 'Optimization', 'Computer Vision', 'MLOps', 'Ensemble ML'].map(
                (skill) => (
                  <span key={skill} className="tag-pill">
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-ink/10">
              <p className="text-eyebrow mb-4">Education &amp; recognition</p>
              <ul className="space-y-3 text-body">
                <li>B.Tech — IIT (BHU), Varanasi · 2019</li>
                <li>Bravo Award — Sigmoid (Quick Learner)</li>
                <li>Two promotions in under a year each for continuous outperformance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
