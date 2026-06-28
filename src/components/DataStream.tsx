import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

interface Glyph {
  x: number;
  y: number;
  char: string;
  opacity: number;
  targetOpacity: number;
  speed: number;
  size: number;
  flash: number;
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{ glyphs: Glyph[]; animId: number }>({
    glyphs: [],
    animId: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const state = stateRef.current;
    let w = 0;
    let h = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.scale(dpr, dpr);
      initGlyphs();
    }

    function initGlyphs() {
      const cols = Math.floor(w / 16);
      const rows = Math.floor(h / 20);
      state.glyphs = [];
      for (let i = 0; i < cols * rows * 0.4; i++) {
        state.glyphs.push(createGlyph());
      }
    }

    function createGlyph(): Glyph {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0,
        targetOpacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 8 + 8,
        flash: 0,
      };
    }

    let time = 0;

    function animate() {
      time++;
      ctx!.clearRect(0, 0, w, h);

      // Background
      ctx!.fillStyle = '#110F0F';
      ctx!.fillRect(0, 0, w, h);

      for (const g of state.glyphs) {
        // Update
        g.y += g.speed;
        if (g.y > h) {
          g.y = -20;
          g.x = Math.random() * w;
          g.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        // Flicker
        if (Math.random() < 0.005) {
          g.flash = 1;
          g.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        g.flash *= 0.95;

        // Fade toward target
        const diff = g.targetOpacity - g.opacity;
        g.opacity += diff * 0.02;

        // Draw with bloom effect
        const alpha = g.opacity + g.flash * 0.5;
        const fontSize = g.size;

        // Glow layer
        ctx!.font = `${fontSize}px "Courier New", monospace`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';

        // Outer glow
        ctx!.fillStyle = `rgba(228, 138, 24, ${alpha * 0.15})`;
        ctx!.fillText(g.char, g.x, g.y);
        ctx!.fillText(g.char, g.x, g.y - 1);
        ctx!.fillText(g.char, g.x, g.y + 1);
        ctx!.fillText(g.char, g.x - 1, g.y);
        ctx!.fillText(g.char, g.x + 1, g.y);

        // Core
        ctx!.fillStyle = `rgba(228, 138, 24, ${alpha * 0.6})`;
        ctx!.fillText(g.char, g.x, g.y);

        // Bright center when flashing
        if (g.flash > 0.3) {
          ctx!.fillStyle = `rgba(245, 175, 75, ${g.flash * 0.8})`;
          ctx!.fillText(g.char, g.x, g.y);
        }
      }

      state.animId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
