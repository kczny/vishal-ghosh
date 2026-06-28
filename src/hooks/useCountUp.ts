import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  duration?: number;
  decimals?: number;
}

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Returns a ref to attach and the current display value (string with decimals).
 */
export function useCountUp<T extends HTMLElement>(
  end: number,
  options?: CountUpOptions
) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  const duration = options?.duration ?? 1600;
  const decimals = options?.decimals ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();

            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setValue(end * eased);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(end);
              }
            };

            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const display = value.toFixed(decimals);

  return { ref, value, display };
}
