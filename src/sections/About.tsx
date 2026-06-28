import InteractiveGrid from '../components/InteractiveGrid';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>('fadeUp', { delay: 0.2 });
  const bodyRef = useScrollAnimation<HTMLParagraphElement>('fadeUp', { delay: 0.3 });
  const photoRef = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.15 });

  return (
    <section id="about" className="relative w-full bg-light">
      <div className="pt-32 pb-12">
        <InteractiveGrid />
      </div>

      <div className="section-container pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-[960px] mx-auto">
          <div ref={photoRef} className="shrink-0">
            <div className="h-64 w-64 sm:h-72 sm:w-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-dark/10">
              <img
                src="/images/profile.png"
                alt="Vishal Ghosh — Senior Data Scientist"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2
              ref={headingRef}
              className="font-display text-display-lg text-dark leading-[1.1] tracking-[-0.01em]"
            >
              Science &amp; Intuition
            </h2>

            <p ref={bodyRef} className="mt-6 text-body text-dark/70">
              With over 6 years of experience in data science and AI leadership, I have led
              cross-functional teams to build enterprise-grade forecasting systems, GenAI document
              intelligence pipelines, and supply chain optimizers. Currently at o9 Solutions, I
              deliver forecast accuracy improvements across 150+ brands. Previously at Sigmoid, I
              architected RAG-based solutions and demand forecasting engines that consistently
              outperformed industry benchmarks.
            </p>

            <p className="mt-4 text-body text-dark/70">
              B.Tech from IIT (BHU), Varanasi — I combine rigorous mathematical modeling with
              intuitive product thinking. Recognized with the Bravo Award at Sigmoid and two rapid
              promotions for continuous outperformance.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {['GenAI', 'Forecasting', 'Optimization', 'Computer Vision', 'MLOps'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-dark/10 bg-white px-4 py-1.5 text-label font-medium text-dark/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
