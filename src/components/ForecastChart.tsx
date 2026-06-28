import { useEffect, useMemo, useRef, useState } from 'react';

type ModelKey = 'prophet' | 'sarima' | 'lightgbm' | 'ensemble';

/** Animates from its previous value to the new value whenever `value` changes. */
function AnimatedMetric({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const to = value;
    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface ModelConfig {
  key: ModelKey;
  label: string;
  mape: number;
  uplift: number;
  bandScale: number;
  seed: number;
}

const MODELS: ModelConfig[] = [
  { key: 'prophet', label: 'Prophet', mape: 14.2, uplift: 11, bandScale: 1.25, seed: 7 },
  { key: 'sarima', label: 'SARIMA', mape: 12.8, uplift: 16, bandScale: 1.1, seed: 13 },
  { key: 'lightgbm', label: 'LightGBM', mape: 10.4, uplift: 22, bandScale: 0.95, seed: 21 },
  { key: 'ensemble', label: 'Ensemble', mape: 7.9, uplift: 28, bandScale: 0.7, seed: 42 },
];

const WIDTH = 760;
const HEIGHT = 320;
const PAD_X = 16;
const PAD_TOP = 24;
const PAD_BOTTOM = 28;
const HISTORY_POINTS = 36;
const FORECAST_POINTS = 18;

// Deterministic pseudo-random for stable rendering
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SeriesData {
  history: number[];
  forecast: number[];
  lower: number[];
  upper: number[];
  min: number;
  max: number;
}

function buildSeries(model: ModelConfig): SeriesData {
  const rand = mulberry32(model.seed);
  const history: number[] = [];
  const base = 100;

  for (let i = 0; i < HISTORY_POINTS; i++) {
    const trend = i * 1.1;
    const seasonal = Math.sin((i / 6) * Math.PI) * 18;
    const weekly = Math.cos((i / 3) * Math.PI) * 6;
    const noise = (rand() - 0.5) * 14;
    history.push(base + trend + seasonal + weekly + noise);
  }

  const last = history[history.length - 1];
  const forecast: number[] = [];
  const lower: number[] = [];
  const upper: number[] = [];

  for (let i = 0; i < FORECAST_POINTS; i++) {
    const idx = HISTORY_POINTS + i;
    const trend = idx * 1.1;
    const seasonal = Math.sin((idx / 6) * Math.PI) * 18;
    const weekly = Math.cos((idx / 3) * Math.PI) * 6;
    const drift = (rand() - 0.5) * 4 * model.bandScale;
    const value = base + trend + seasonal + weekly + drift;
    forecast.push(value);
    // widening confidence band over the horizon
    const spread = (6 + i * 1.6) * model.bandScale;
    lower.push(value - spread);
    upper.push(value + spread);
  }

  // bridge so the forecast visually connects to history
  forecast.unshift(last);
  lower.unshift(last);
  upper.unshift(last);

  const all = [...history, ...upper, ...lower];
  return {
    history,
    forecast,
    lower,
    upper,
    min: Math.min(...all),
    max: Math.max(...all),
  };
}

export default function ForecastChart() {
  const [model, setModel] = useState<ModelKey>('ensemble');
  const pathRef = useRef<SVGPathElement>(null);
  const config = MODELS.find((m) => m.key === model)!;

  const data = useMemo(() => buildSeries(config), [config]);

  const totalPoints = HISTORY_POINTS + FORECAST_POINTS;
  const plotW = WIDTH - PAD_X * 2;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const range = data.max - data.min || 1;

  const xAt = (index: number) => PAD_X + (index / (totalPoints - 1)) * plotW;
  const yAt = (value: number) =>
    PAD_TOP + plotH - ((value - data.min) / range) * plotH;

  const historyPath = useMemo(() => {
    return data.history
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`)
      .join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const forecastPath = useMemo(() => {
    return data.forecast
      .map((v, i) => {
        const idx = HISTORY_POINTS - 1 + i;
        return `${i === 0 ? 'M' : 'L'} ${xAt(idx).toFixed(1)} ${yAt(v).toFixed(1)}`;
      })
      .join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const bandPath = useMemo(() => {
    const upper = data.upper
      .map((v, i) => {
        const idx = HISTORY_POINTS - 1 + i;
        return `${i === 0 ? 'M' : 'L'} ${xAt(idx).toFixed(1)} ${yAt(v).toFixed(1)}`;
      })
      .join(' ');
    const lower = [...data.lower]
      .map((v, i) => {
        const idx = HISTORY_POINTS - 1 + i;
        return { x: xAt(idx), y: yAt(v) };
      })
      .reverse()
      .map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
    return `${upper} ${lower} Z`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Animate the forecast line drawing whenever the model changes
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const length = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    // force reflow
    void path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 1.1s ease-out';
    path.style.strokeDashoffset = '0';
  }, [model, forecastPath]);

  const splitX = xAt(HISTORY_POINTS - 1);

  return (
    <div className="surface-card-dark p-5 sm:p-7">
      {/* Model toggle chips */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-mono-label text-muted-text mr-1">model:</span>
        {MODELS.map((m) => {
          const active = m.key === model;
          return (
            <button
              key={m.key}
              onClick={() => setModel(m.key)}
              className={`rounded-full px-3.5 py-1.5 text-mono-label transition-all duration-300 border ${
                active
                  ? 'bg-amber text-dark border-amber font-semibold'
                  : 'bg-transparent text-muted-text border-text-light/15 hover:border-amber/60 hover:text-text-light'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Forecast chart using ${config.label} model`}
        >
          <defs>
            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E48A18" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E48A18" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = PAD_TOP + plotH * t;
            return (
              <line
                key={t}
                x1={PAD_X}
                y1={y}
                x2={WIDTH - PAD_X}
                y2={y}
                stroke="rgba(234,234,234,0.06)"
                strokeWidth="1"
              />
            );
          })}

          {/* forecast region shading divider */}
          <line
            x1={splitX}
            y1={PAD_TOP}
            x2={splitX}
            y2={PAD_TOP + plotH}
            stroke="rgba(234,234,234,0.18)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x={splitX + 6}
            y={PAD_TOP + 12}
            className="text-mono-label"
            fill="#888888"
            fontSize="10"
            fontFamily="'IBM Plex Mono', monospace"
          >
            forecast →
          </text>

          {/* confidence band */}
          <path d={bandPath} fill="url(#bandGradient)" stroke="none" />

          {/* history line */}
          <path
            d={historyPath}
            fill="none"
            stroke="#EAEAEA"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* forecast line (animated) */}
          <path
            ref={pathRef}
            d={forecastPath}
            fill="none"
            stroke="#E48A18"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* endpoint marker */}
          <circle
            cx={xAt(totalPoints - 1)}
            cy={yAt(data.forecast[data.forecast.length - 1])}
            r="4"
            fill="#F5AF4B"
          />
        </svg>
      </div>

      {/* Metric callouts */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-text-light/10 bg-dark/40 px-4 py-3">
          <div className="text-mono-label text-muted-text">MAPE</div>
          <div className="mt-1 font-body font-semibold text-text-light text-2xl tabular-nums">
            <AnimatedMetric value={config.mape} decimals={1} suffix="%" />
          </div>
        </div>
        <div className="rounded-xl border border-text-light/10 bg-dark/40 px-4 py-3">
          <div className="text-mono-label text-muted-text">Uplift vs baseline</div>
          <div className="mt-1 font-body font-semibold text-amber text-2xl tabular-nums">
            <AnimatedMetric value={config.uplift} prefix="+" suffix="%" />
          </div>
        </div>
        <div className="rounded-xl border border-text-light/10 bg-dark/40 px-4 py-3">
          <div className="text-mono-label text-muted-text">Horizon</div>
          <div className="mt-1 font-body font-semibold text-text-light text-2xl tabular-nums">
            18<span className="text-base text-muted-text"> wks</span>
          </div>
        </div>
        <div className="rounded-xl border border-text-light/10 bg-dark/40 px-4 py-3">
          <div className="text-mono-label text-muted-text">Exog. signals</div>
          <div className="mt-1 font-body font-semibold text-text-light text-2xl tabular-nums">
            30<span className="text-base text-muted-text">+</span>
          </div>
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-mono-label text-muted-text border-t border-text-light/10 pt-4">
        <span>backtest: rolling-origin</span>
        <span>loss: pinball + MAPE</span>
        <span>signals: 30+ exogenous</span>
        <span>normalization: demand-deseasonalized</span>
      </div>
    </div>
  );
}

export { MODELS };
export type { ModelKey };
