import { useScrollAnimation } from '../hooks/useScrollAnimation';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const ref = useScrollAnimation<HTMLDivElement>('fadeUp');

  return (
    <section id="contact" className="section-pad bg-ink text-cream">
      <div className="section-container">
        <div ref={ref} className="opacity-0 max-w-[640px]">
          <p className="text-eyebrow !text-cream/50">Get in touch</p>
          <h2 className="mt-4 font-display text-display-lg text-cream leading-[1.08]">
            Let&apos;s build something intelligent together.
          </h2>
          <p className="mt-6 text-body-lg !text-cream/70">
            Open to conversations about forecasting systems, GenAI architecture, and production ML
            — whether that&apos;s a role, a collaboration, or a hard problem worth solving.
          </p>

          <div className="mt-10">
            <MagneticButton
              href="mailto:vishal.ghosh108@gmail.com"
              className="btn-primary !bg-cream !text-ink hover:!bg-cream/90"
            >
              Start a conversation
            </MagneticButton>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10">
            <a href="mailto:vishal.ghosh108@gmail.com" className="text-meta !text-cream/60 hover:!text-cream transition-colors">
              vishal.ghosh108@gmail.com
            </a>
            <a href="tel:+917991120062" className="text-meta !text-cream/60 hover:!text-cream transition-colors">
              +91-7991120062
            </a>
            <a
              href="https://linkedin.com/in/vishal-ghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-meta !text-cream/60 hover:!text-cream transition-colors"
            >
              linkedin.com/in/vishal-ghosh
            </a>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-meta !text-cream/40">Vishal Ghosh · 2026</span>
          <span className="text-meta !text-cream/40">Designed with precision</span>
        </div>
      </div>
    </section>
  );
}
