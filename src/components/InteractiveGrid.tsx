import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  type: number;
  locked: boolean;
  flash: number;
  size: number;
}

interface Spring {
  a: Dot;
  b: Dot;
  restLength: number;
}

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    dots: Dot[];
    springs: Spring[];
    mouse: { x: number; y: number; px: number; py: number };
    animId: number;
  }>({
    dots: [],
    springs: [],
    mouse: { x: -9999, y: -9999, px: -9999, py: -9999 },
    animId: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Config
    const GRID_W = 1000;
    const GRID_H = 600;
    const FONT_SIZE = 80;
    const RESOLUTION = 8;
    const MOUSE_DELAY = 40;
    const MOUSE_DRAG = 5;
    const SPRING_TENSION = 0.1;
    const SPRING_DAMPING = 0.99;
    const DOT_SIZE_BASE = 4;
    const DOT_HOVER = 20;
    const DOT_UNLOCK = 200;
    const BG_COLOR = '#F0F0F0';
    const DOT_COLOR = '#CCCCCC';
    const DOT_LOCKED = '#888888';
    const DOT_FLASH = '#E48A18';
    const SPRING_COLOR = '#CCCCCC';

    const state = stateRef.current;
    const mouseQueue: { x: number; y: number }[] = [];

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height + 'px';
      ctx!.scale(dpr, dpr);
    }

    function renderTextToDots() {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = GRID_W;
      offCanvas.height = GRID_H;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.fillStyle = '#000';
      offCtx.font = `bold ${FONT_SIZE}px "Instrument Sans", sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      const words = ['PRECISION', 'BEAUTY'];
      const lineHeight = FONT_SIZE + 20;
      const startY = GRID_H / 2 - (words.length - 1) * lineHeight / 2;

      words.forEach((word, i) => {
        offCtx.fillText(word, GRID_W / 2, startY + i * lineHeight);
      });

      const imageData = offCtx.getImageData(0, 0, GRID_W, GRID_H);
      const pixels = imageData.data;
      const newDots: Dot[] = [];

      for (let y = 0; y < GRID_H; y += RESOLUTION) {
        for (let x = 0; x < GRID_W; x += RESOLUTION) {
          const idx = (y * GRID_W + x) * 4;
          if (pixels[idx + 3] > 128) {
            const wordIndex = y < GRID_H / 2 ? 0 : 1;
            newDots.push({
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2,
              baseX: x,
              baseY: y,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              type: wordIndex,
              locked: true,
              flash: 0,
              size: DOT_SIZE_BASE,
            });
          }
        }
      }

      // Create springs between nearby dots
      const springs: Spring[] = [];
      const connectionDist = RESOLUTION * 2.5;
      for (let i = 0; i < newDots.length; i++) {
        for (let j = i + 1; j < newDots.length; j++) {
          const dx = newDots[i].baseX - newDots[j].baseX;
          const dy = newDots[i].baseY - newDots[j].baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            springs.push({
              a: newDots[i],
              b: newDots[j],
              restLength: dist,
            });
          }
        }
      }

      state.dots = newDots;
      state.springs = springs;
    }

    let time = 0;

    function animate() {
      time++;
      const rect = container!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const scaleX = w / GRID_W;
      const scaleY = h / GRID_H;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (w - GRID_W * scale) / 2;
      const offsetY = (h - GRID_H * scale) / 2;

      // Mouse delay
      let mouseX = -9999;
      let mouseY = -9999;
      if (mouseQueue.length > 0) {
        const delayedIdx = Math.max(0, mouseQueue.length - MOUSE_DELAY);
        const m = mouseQueue[Math.floor(delayedIdx)];
        mouseX = (m.x - offsetX) / scale;
        mouseY = (m.y - offsetY) / scale;
      }

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = BG_COLOR;
      ctx!.fillRect(0, 0, w, h);

      ctx!.save();
      ctx!.translate(offsetX, offsetY);
      ctx!.scale(scale, scale);

      // Physics update
      if (!prefersReduced) {
        // Mouse depression
        for (const dot of state.dots) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < DOT_HOVER) {
            dot.locked = false;
            const force = (1 - dist / DOT_HOVER) * MOUSE_DRAG;
            dot.vx -= (dx / dist) * force * 0.3;
            dot.vy -= (dy / dist) * force * 0.3;
            dot.flash = Math.max(dot.flash, 1);
          } else if (dist > DOT_UNLOCK) {
            dot.locked = true;
          }

          // Spring forces toward base
          const sdx = dot.baseX - dot.x;
          const sdy = dot.baseY - dot.y;
          dot.vx += sdx * SPRING_TENSION * (dot.locked ? 0.5 : 0.1);
          dot.vy += sdy * SPRING_TENSION * (dot.locked ? 0.5 : 0.1);

          // Damping
          dot.vx *= SPRING_DAMPING;
          dot.vy *= SPRING_DAMPING;

          // Update position
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Decay flash
          dot.flash *= 0.95;

          // Size based on activity
          const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
          dot.size = DOT_SIZE_BASE + speed * 2;
        }

        // Spring constraints
        for (const spring of state.springs) {
          const dx = spring.b.x - spring.a.x;
          const dy = spring.b.y - spring.a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist === 0) continue;
          const diff = (dist - spring.restLength) / dist * 0.5;
          const ox = dx * diff * 0.5;
          const oy = dy * diff * 0.5;

          if (!spring.a.locked) {
            spring.a.x += ox;
            spring.a.y += oy;
          }
          if (!spring.b.locked) {
            spring.b.x -= ox;
            spring.b.y -= oy;
          }
        }
      }

      // Draw springs
      ctx!.strokeStyle = SPRING_COLOR;
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      for (const spring of state.springs) {
        ctx!.moveTo(spring.a.x, spring.a.y);
        ctx!.lineTo(spring.b.x, spring.b.y);
      }
      ctx!.stroke();

      // Draw dots
      for (const dot of state.dots) {
        const isFlashing = dot.flash > 0.1;
        ctx!.fillStyle = isFlashing ? DOT_FLASH : dot.locked ? DOT_LOCKED : DOT_COLOR;
        ctx!.strokeStyle = '#FFFFFF';
        ctx!.lineWidth = 1;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
      }

      ctx!.restore();

      state.animId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseQueue.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      if (mouseQueue.length > MOUSE_DELAY + 10) mouseQueue.shift();
    }

    function onMouseLeave() {
      mouseQueue.length = 0;
    }

    resize();
    renderTextToDots();
    animate();

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', () => {
      resize();
      renderTextToDots();
    });

    return () => {
      cancelAnimationFrame(state.animId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500px' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'crosshair',
        }}
      />
    </div>
  );
}
