import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tweens: gsap.core.Tween[] = [];

    if (titleRef.current) {
      tweens.push(
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    if (ctaRef.current) {
      tweens.push(
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    if (infoRef.current) {
      tweens.push(
        gsap.fromTo(
          infoRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="contact" className="relative w-full bg-dark pt-40 pb-20">
      <div className="section-container text-center">
        <div className="mb-6 flex justify-center">
          <span className="text-eyebrow">Get in touch</span>
        </div>
        <h2
          ref={titleRef}
          className="font-display text-display-xl text-text-light leading-[1.05] tracking-[-0.02em] opacity-0"
        >
          Let&apos;s build something
          <br />
          <em className="italic text-amber">intelligent</em>
          <br />
          together
        </h2>

        <div ref={ctaRef} className="mt-12 opacity-0">
          <MagneticButton
            href="mailto:vishal.ghosh108@gmail.com"
            className="rounded-full bg-amber px-10 py-4 text-body font-semibold text-dark tracking-[0.02em] hover:bg-amber-light transition-colors duration-300"
          >
            Start a Conversation
          </MagneticButton>
        </div>

        <div
          ref={infoRef}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 opacity-0"
        >
          <a
            href="mailto:vishal.ghosh108@gmail.com"
            className="text-mono-label text-muted-text hover:text-text-light transition-colors duration-300"
          >
            vishal.ghosh108@gmail.com
          </a>
          <a
            href="tel:+917991120062"
            className="text-mono-label text-muted-text hover:text-text-light transition-colors duration-300"
          >
            +91-7991120062
          </a>
          <a
            href="https://linkedin.com/in/vishal-ghosh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono-label text-muted-text hover:text-text-light transition-colors duration-300"
          >
            linkedin.com/in/vishal-ghosh
          </a>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between border-t border-text-light/10 pt-6">
          <span className="text-label text-muted-text">Vishal Ghosh &middot; 2026</span>
          <span className="text-label text-muted-text mt-2 sm:mt-0">
            Designed with precision
          </span>
        </div>
      </div>
    </section>
  );
}
