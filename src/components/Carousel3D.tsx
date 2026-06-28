import { useEffect, useRef } from 'react';

const competencies = [
  { label: 'Machine Learning', icon: BrainIcon },
  { label: 'Deep Learning', icon: LayersIcon },
  { label: 'NLP', icon: ChatIcon },
  { label: 'Computer Vision', icon: EyeIcon },
  { label: 'Time-Series', icon: ClockIcon },
  { label: 'Optimization', icon: GraphIcon },
  { label: 'GenAI', icon: SparkIcon },
  { label: 'MLOps', icon: GearIcon },
];

const RADIUS = 360;
const ITEM_COUNT = 8;

export default function Carousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef({
    rotation: 0,
    velocity: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    tiltX: 0,
    animId: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = stateRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Static layout for reduced motion
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const angle = (i / ITEM_COUNT) * Math.PI * 2;
        const x = Math.sin(angle) * RADIUS * 0.6;
        item.style.transform = `translate3d(${x}px, 0, 0)`;
      });
      return;
    }

    function onDown(e: MouseEvent | TouchEvent) {
      state.isDragging = true;
      container!.style.cursor = 'grabbing';
      state.lastX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      state.lastY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      state.velocity = 0;
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!state.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const delta = clientX - state.lastX;
      const deltaY = clientY - state.lastY;
      state.rotation += delta * 0.3;
      state.velocity = delta * 0.3;
      state.tiltX = deltaY * 0.2;
      state.lastX = clientX;
      state.lastY = clientY;
    }

    function onUp() {
      state.isDragging = false;
      container!.style.cursor = 'grab';
      state.tiltX = 0;
    }

    function animate() {
      if (!state.isDragging) {
        state.velocity *= 0.95;
        // Auto-rotate slowly
        state.velocity += 0.05;
      }
      state.rotation += state.velocity;

      if (!state.isDragging) {
        state.tiltX += (0 - state.tiltX) * 0.1;
      }

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const angle =
          (i / ITEM_COUNT) * Math.PI * 2 + (state.rotation * Math.PI) / 180;
        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle * 2) * 40;
        const rotateY = -angle * (180 / Math.PI);

        item.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) rotateX(${state.tiltX}deg)`;

        const scale = (z + RADIUS) / (2 * RADIUS) * 0.5 + 0.5;
        item.style.opacity = String(scale);
        item.style.zIndex = String(Math.floor(scale * 100));
      });

      state.animId = requestAnimationFrame(animate);
    }

    container.addEventListener('mousedown', onDown);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseup', onUp);
    container.addEventListener('mouseleave', onUp);
    container.addEventListener('touchstart', onDown as EventListener, { passive: true });
    container.addEventListener('touchmove', onMove as EventListener, { passive: true });
    container.addEventListener('touchend', onUp);

    animate();

    return () => {
      cancelAnimationFrame(state.animId);
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseup', onUp);
      container.removeEventListener('mouseleave', onUp);
      container.removeEventListener('touchstart', onDown as EventListener);
      container.removeEventListener('touchmove', onMove as EventListener);
      container.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden cursor-grab"
      style={{ height: '500px' }}
    >
      {/* Ground reflection */}
      <div
        className="absolute top-[80%] left-0 right-0 bottom-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(228,138,24,0.06), transparent)',
          zIndex: 0,
        }}
      />

      <div
        ref={sceneRef}
        className="absolute top-1/2 left-1/2"
        style={{
          width: 0,
          height: 0,
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {competencies.map((comp, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute flex flex-col items-center justify-center gap-3 select-none"
            style={{
              top: '50%',
              left: '50%',
              width: '80px',
              height: '80px',
              marginTop: '-40px',
              marginLeft: '-40px',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              background:
                'radial-gradient(circle at 30% 30%, #F5AF4B, #E48A18)',
              borderRadius: '50%',
              boxShadow:
                'inset 0 0 0 2px rgba(255,255,255,0.15), 0 10px 30px rgba(228,138,24,0.3)',
            }}
          >
            <comp.icon className="w-8 h-8 text-white" />
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
        {competencies.map((comp, i) => (
          <span
            key={i}
            className="text-xs font-medium text-[#888888] tracking-[0.02em]"
          >
            {comp.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// SVG Icons
function BrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="1" y1="12" x2="23" y2="12" strokeOpacity="0.3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <polyline points="6 18 12 12" strokeOpacity="0.3" />
    </svg>
  );
}

function GraphIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M5 20v-8l4-4 4 4 4-8 2 4" />
      <circle cx="17" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      <line x1="8" y1="12" x2="16" y2="12" strokeOpacity="0.3" />
    </svg>
  );
}
