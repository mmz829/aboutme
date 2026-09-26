import { useEffect, useState } from 'react';

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    const observer = new IntersectionObserver(
      (entries) => {
        if (atBottom()) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));

    // The last section is often too short to cross the middle band.
    const onScroll = () => {
      if (atBottom()) setActive(ids[ids.length - 1]);
      else if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}
