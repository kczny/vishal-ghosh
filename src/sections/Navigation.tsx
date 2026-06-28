import { useEffect, useState } from 'react';
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
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['work', 'about', 'experience', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md border-b border-ink/8 shadow-[0_1px_0_rgba(28,25,23,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex h-[68px] items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-xl text-ink tracking-[-0.02em]"
        >
          Vishal Ghosh
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === link.id ? 'text-accent' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="btn-primary !py-2.5 !px-5 !text-[13px]">
            Let&apos;s talk
          </button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 text-ink" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-cream border-ink/10 w-[280px]">
            <SheetHeader>
              <SheetTitle className="font-display text-ink text-left">Vishal Ghosh</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-left px-3 py-3 text-body text-ink hover:text-accent rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <button onClick={() => scrollTo('contact')} className="mt-4 btn-primary w-full">
                  Let&apos;s talk
                </button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
