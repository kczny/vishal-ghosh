import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ForecastChart from '../components/ForecastChart';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const techStack = [
  'Python',
  'Prophet',
  'SARIMA',
  'LightGBM',
  'XGBoost',
  'Pandas',
  'Snowflake',
  'Airflow',
];

const caseStudy = [
  {
    label: 'Problem',
    body: 'Volatile, multi-region demand with regulatory and supply-chain noise made naive forecasts unreliable across hundreds of SKUs and brands.',
  },
  {
    label: 'Approach',
    body: 'Blend Prophet, SARIMA and LightGBM with learned per-series weights, inject 30+ exogenous signals, and normalize demand to neutralize disruption noise. Calibrate intervals with rolling-origin backtesting and a pinball + MAPE objective.',
  },
  {
    label: 'Impact',
    body: '~28% average forecast accuracy improvement across 150+ brands, and 10-30% gains over Amazon Forecast across confidence intervals in prior pharma deployments.',
  },
];

export default function ForecastingEngine() {
  const headerRef = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.1 });
  const chartRef = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.2 });
  const caseRef = useScrollAnimation<HTMLDivElement>('fadeUp', { delay: 0.1 });

  return (
    <section
      id="forecasting"
      className="relative w-full bg-dark py-32 overflow-hidden"
    >
      {/* faint technical grid backdrop */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <div ref={headerRef} className="max-w-[760px]">
          <div className="flex items-center gap-3">
            <span className="text-eyebrow">Flagship R&amp;D</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-mono-label text-amber">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              in active development
            </span>
          </div>

          <h2 className="mt-5 font-display text-display-lg text-text-light leading-[1.05] tracking-[-0.01em]">
            The Forecasting Engine
          </h2>
          <p className="mt-5 text-body text-muted-text">
            A production-grade ensemble forecasting system I'm building — turning noisy, real-world
            demand into calibrated, decision-ready predictions. Toggle a model below to see how the
            forecast and its confidence band respond.
          </p>
        </div>

        {/* Interactive demo */}
        <div ref={chartRef} className="mt-12">
          <ForecastChart />
        </div>

        {/* Case study */}
        <div ref={caseRef} className="mt-20">
          <span className="text-eyebrow">Case Study</span>
          <h3 className="mt-4 font-display text-display-md text-text-light leading-[1.15]">
            Designing for accuracy, calibration & scale
          </h3>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {caseStudy.map((item) => (
              <div key={item.label} className="surface-card-dark p-6">
                <div className="text-eyebrow">{item.label}</div>
                <p className="mt-3 text-body text-muted-text">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Architecture pipeline */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-mono-label text-muted-text">pipeline</span>
              <div className="hairline-dark flex-1" />
            </div>
            <ArchitectureDiagram />
          </div>

          {/* Tech stack + private repo note */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-text-light/10 bg-dark-mid/40 px-3 py-1.5 text-mono-label text-text-light/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/kczny"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mono-label text-muted-text hover:text-amber transition-colors duration-300 whitespace-nowrap"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.15.6.11.82-.25.82-.58 0-.29-.01-1.04-.02-2.05-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.25 2.87.12 3.17.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .33.21.7.83.58A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
              </svg>
              private repo — insights only
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
