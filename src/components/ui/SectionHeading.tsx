import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import './SectionHeading.css';

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  id: string;
  children?: ReactNode;
};

export function SectionHeading({ index, eyebrow, title, id, children }: Props) {
  const reveal = useReveal<HTMLDivElement>();
  return (
    <div ref={reveal.ref} className={`section-heading ${reveal.className}`}>
      <p className="section-heading__kicker" aria-hidden="true">
        {index}
        <span>{eyebrow}</span>
      </p>
      <div className="section-heading__row">
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
        {children && <p className="section-heading__lead">{children}</p>}
      </div>
    </div>
  );
}
