import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  strength?: number;
}

/**
 * A button/link that subtly follows the pointer (magnetic effect).
 * Falls back to a normal element when reduced motion is preferred.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  download,
  target,
  rel,
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `inline-block transition-transform duration-300 ease-out will-change-transform ${className}`,
  };

  if (href) {
    return (
      <a {...sharedProps} href={href} download={download} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} onClick={onClick}>
      {children}
    </button>
  );
}
