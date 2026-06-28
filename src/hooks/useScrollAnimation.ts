import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation<T extends HTMLElement>(
  animation: 'fadeUp' | 'fadeIn' | 'stagger' = 'fadeUp',
  options?: { delay?: number; duration?: number; y?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const delay = options?.delay ?? 0;
    const duration = options?.duration ?? 0.8;
    const y = options?.y ?? 60;

    let tween: gsap.core.Tween | gsap.core.Timeline;

    if (animation === 'fadeUp') {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else if (animation === 'stagger') {
      const children = el.children;
      tween = gsap.fromTo(
        children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      tween = gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      tween?.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, options?.delay, options?.duration, options?.y]);

  return ref;
}
