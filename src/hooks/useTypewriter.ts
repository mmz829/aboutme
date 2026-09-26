import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useTypewriter(text: string, speed = 38) {
  const reduced = usePrefersReducedMotion();
  const chars = Array.from(text);
  const [count, setCount] = useState(reduced ? chars.length : 0);

  useEffect(() => {
    setCount(reduced ? Array.from(text).length : 0);
  }, [text, reduced]);

  const done = count >= chars.length;

  useEffect(() => {
    if (done) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, done, speed]);

  const skip = useCallback(() => setCount(chars.length), [chars.length]);

  return { output: chars.slice(0, count).join(''), done, skip };
}
