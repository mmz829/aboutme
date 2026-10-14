import type { CSSProperties } from 'react';
import { learning, skillCategories, skillLegend, type SkillCategory } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TechLabel } from '../ui/TechIcon';
import { TreasureChest } from '../ui/TreasureChest';
import './Skills.css';

function Gauge({ level }: { level: number }) {
  return (
    <span className="gauge" style={{ '--level': level } as CSSProperties} aria-hidden="true">
      <span className="gauge__fill" />
    </span>
  );
}

function SkillBand({ category, index }: { category: SkillCategory; index: number }) {
  const reveal = useReveal<HTMLDivElement>();
  return (
    <div
      ref={reveal.ref}
      className={`skill-band ${reveal.className}`}
      style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
    >
      <header className="skill-band__head">
        <h3 className="skill-band__title">{category.title}</h3>
        <p className="skill-band__kicker">{category.en}</p>
      </header>
      <ul className="skill-band__list">
        {category.skills.map((s) => (
          <li key={s.name} className="skill">
            <span className="skill__name">
              <TechLabel name={s.name} />
            </span>
            <span className="skill__level" data-level={s.level} style={{ '--level': s.level } as CSSProperties}>
              <span className="visually-hidden">レベル {s.level} / 5</span>
              <Gauge level={s.level} />
              <span className="skill__lv" aria-hidden="true">
                Lv.{s.level}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const learningReveal = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index="02" eyebrow="SKILLS" title="スキル" id="skills-title">
          経歴で使ってきた技術を、実務でどこまで任せられるかでレベル分けしています。
        </SectionHeading>

        <div className="skill-legend" aria-label="レベルの目安">
          {skillLegend.map((l) => (
            <span key={l.level} className="skill-legend__item" data-level={l.level} style={{ '--level': l.level } as CSSProperties}>
              <Gauge level={l.level} />
              <span className="skill__lv">Lv.{l.level}</span>
              <span>{l.label}</span>
            </span>
          ))}
        </div>

        <div className="skill-stack">
          {skillCategories.map((c, i) => (
            <SkillBand key={c.id} category={c} index={i} />
          ))}
          <div
            ref={learningReveal.ref}
            className={`skill-band learning ${learningReveal.className}`}
            style={{ '--reveal-delay': `${skillCategories.length * 80}ms` } as CSSProperties}
          >
            <header className="skill-band__head">
              <h3 className="skill-band__title">勉強中</h3>
              <p className="skill-band__kicker">Learning</p>
            </header>
            <ul className="tag-list">
              {learning.map((item) => (
                <li key={item} className="tag">
                  <TechLabel name={item} />
                </li>
              ))}
            </ul>
            <TreasureChest id="skills" className="learning__chest" />
          </div>
        </div>
      </div>
    </section>
  );
}
