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
      <div className="section-heading__plate pixel-box">
        <p className="pixel-tab" aria-hidden="true">
          {index} {eyebrow}
        </p>
        <span className="section-heading__cursor" aria-hidden="true">
          ▶
        </span>
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
      </div>
      {children && <p className="section-heading__lead">{children}</p>}
    </div>
  );
}
