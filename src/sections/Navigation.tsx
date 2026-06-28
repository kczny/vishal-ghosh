import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(17, 15, 15, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(234, 234, 234, 0.08)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-2xl text-[#EAEAEA] tracking-[-0.02em]"
        >
          Vishal Ghosh.
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('about')}
            className="text-sm font-medium text-[#EAEAEA] tracking-[0.02em] hover:text-[#E48A18] transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="text-sm font-medium text-[#EAEAEA] tracking-[0.02em] hover:text-[#E48A18] transition-colors duration-300"
          >
            Experience
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="text-sm font-medium text-[#EAEAEA] tracking-[0.02em] hover:text-[#E48A18] transition-colors duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('impact')}
            className="text-sm font-medium text-[#EAEAEA] tracking-[0.02em] hover:text-[#E48A18] transition-colors duration-300"
          >
            Impact
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-full bg-[#E48A18] px-6 py-3 text-sm font-semibold text-[#110F0F] tracking-[0.04em] hover:bg-[#F5AF4B] transition-colors duration-300"
          >
            Let's Connect
          </button>
        </div>
      </div>
    </nav>
  );
}
