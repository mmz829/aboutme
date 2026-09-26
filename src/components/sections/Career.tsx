import { journey, type Chapter } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TreasureChest } from '../ui/TreasureChest';
import './Career.css';

function ChapterItem({ chapter, current }: { chapter: Chapter; current: boolean }) {
  const reveal = useReveal<HTMLLIElement>();
  return (
    <li ref={reveal.ref} className={`chapter ${current ? 'is-current' : ''} ${reveal.className}`}>
      <div className="chapter__meta">
        <p className="chapter__label pixel">{chapter.chapter}</p>
        <p className="chapter__period">{chapter.period}</p>
      </div>
      <span className="chapter__node" aria-hidden="true" />
      <div className="chapter__card pixel-box">
        {current && <p className="chapter__now pixel">NOW PLAYING</p>}
        <h3 className="chapter__title">{chapter.title}</h3>
        <p className="chapter__org">{chapter.org}</p>
        <p className="chapter__body">{chapter.body}</p>
        <ul className="chapter__items">
          {chapter.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Career() {
  return (
    <section id="career" className="section career" aria-labelledby="career-title">
      <div className="container">
        <SectionHeading index="03" eyebrow="JOURNEY" title="経歴" id="career-title">
          デザイナーとして旅立ち、エンジニアとしての装備も手に入れるまでの冒険の記録です。
        </SectionHeading>

        <ol className="timeline">
          {journey.map((c, i) => (
            <ChapterItem key={c.chapter} chapter={c} current={i === 0} />
          ))}
        </ol>
        <div className="timeline__end">
          <TreasureChest id="journey" />
        </div>
      </div>
    </section>
  );
}
