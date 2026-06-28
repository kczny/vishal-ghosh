import { useCountUp } from '../hooks/useCountUp';

interface CountUpStatProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/** Number that counts up from 0 when scrolled into view. */
export default function CountUpStat({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: CountUpStatProps) {
  const { ref, display } = useCountUp<HTMLSpanElement>(end, { decimals });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
