import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <section id="contact" className="relative w-full bg-[#110F0F] pt-40 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        {/* CTA Title */}
        <h2
          ref={titleRef}
          className="font-serif text-[#EAEAEA] leading-[1.05] tracking-[-0.02em] opacity-0"
          style={{ fontSize: 'clamp(48px, 8vw, 112px)' }}
        >
          Let's build something
          <br />
          <em className="italic text-[#E48A18]">intelligent</em>
          <br />
          together.
        </h2>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <a
            href="mailto:vishal.ghosh108@gmail.com"
            className="inline-block rounded-full bg-[#E48A18] px-10 py-4 text-base font-semibold text-[#110F0F] tracking-[0.02em] hover:bg-[#F5AF4B] hover:scale-105 transition-all duration-300"
          >
            Start a Conversation
          </a>
        </div>

        {/* Contact Info */}
        <div
          ref={infoRef}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 opacity-0"
        >
          <a
            href="mailto:vishal.ghosh108@gmail.com"
            className="text-sm text-[#888888] hover:text-[#EAEAEA] transition-colors duration-300"
          >
            vishal.ghosh108@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/vishal-ghosh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#888888] hover:text-[#EAEAEA] transition-colors duration-300"
          >
            linkedin.com/in/vishal-ghosh
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between border-t border-[rgba(234,234,234,0.08)] pt-6">
          <span className="text-xs text-[#888888]">
            Vishal Ghosh &middot; 2026
          </span>
          <span className="text-xs text-[#888888] mt-2 sm:mt-0">
            Designed with precision
          </span>
        </div>
      </div>
    </section>
  );
}
