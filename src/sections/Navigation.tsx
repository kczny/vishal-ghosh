import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Impact', id: 'impact' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
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
      <div className="section-container flex h-[72px] items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl text-text-light tracking-[-0.02em]"
        >
          Vishal Ghosh
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-label font-medium text-text-light tracking-[0.02em] hover:text-amber transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-full bg-amber px-6 py-3 text-label font-semibold text-dark tracking-[0.04em] hover:bg-amber-light transition-colors duration-300"
          >
            Let&apos;s Connect
          </button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-text-light hover:text-amber transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-dark border-text-light/10 w-[280px]">
            <SheetHeader>
              <SheetTitle className="font-display text-text-light text-left">Vishal Ghosh</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-left px-4 py-3 text-body font-medium text-text-light hover:text-amber hover:bg-text-light/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <button
                  onClick={() => scrollTo('contact')}
                  className="mt-4 rounded-full bg-amber px-6 py-3 text-label font-semibold text-dark tracking-[0.04em] hover:bg-amber-light transition-colors"
                >
                  Let&apos;s Connect
                </button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
