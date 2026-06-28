import InteractiveGrid from '../components/InteractiveGrid';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const headingRef = useScrollAnimation<HTMLHeadingElement>('fadeUp', { delay: 0.2 });
  const bodyRef = useScrollAnimation<HTMLParagraphElement>('fadeUp', { delay: 0.3 });

  return (
    <section id="about" className="relative w-full bg-[#F7F7F7]">
      {/* Interactive Title Grid */}
      <div className="pt-32 pb-20">
        <InteractiveGrid />
      </div>

      {/* Bio Text */}
      <div className="pb-32 px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            ref={headingRef}
            className="font-serif text-[#110F0F] leading-[1.1] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Science &amp; Intuition
          </h2>

          <p ref={bodyRef} className="mt-6 text-[15px] leading-[1.6] text-[#555555]">
            With over 6 years of experience in data science and AI leadership, I have led
            cross-functional teams to build enterprise-grade forecasting systems, GenAI document
            intelligence pipelines, and supply chain optimizers. Currently at o9 Solutions, I deliver
            forecast accuracy improvements across 150+ brands. Previously at Sigmoid, I architected
            RAG-based solutions and demand forecasting engines. My approach combines rigorous
            mathematical modeling with intuitive product thinking — whether it's fine-tuning Hugging
            Face models or designing PyShiny decision-support tools.
          </p>
        </div>
      </div>
    </section>
  );
}
