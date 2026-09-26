import type { CSSProperties } from 'react';
import { learning, skillCategories, skillLegend, type SkillCategory } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TreasureChest } from '../ui/TreasureChest';
import { Window } from '../ui/Window';
import './Skills.css';

function Pips({ level }: { level: number }) {
  return (
    <span className="pips" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`pip ${i < level ? 'is-on' : ''}`} style={{ '--i': i } as CSSProperties} />
      ))}
    </span>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const reveal = useReveal<HTMLDivElement>();
  return (
    <div
      ref={reveal.ref}
      className={reveal.className}
      style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
    >
      <Window label={category.en.toUpperCase()} className="skill-card">
        <h3 className="skill-card__title">{category.title}</h3>
        <ul className="skill-list">
          {category.skills.map((s) => (
            <li key={s.name} className="skill">
              <div className="skill__head">
                <span className="skill__name">{s.name}</span>
                <span className="skill__level">
                  <Pips level={s.level} />
                  <span className="skill__lv pixel">
                    <span className="visually-hidden">レベル</span>Lv.{s.level}
                    <span className="visually-hidden"> / 5</span>
                  </span>
                </span>
              </div>
              <p className="skill__note">{s.note}</p>
            </li>
          ))}
        </ul>
      </Window>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index="02" eyebrow="SKILLS" title="スキル" id="skills-title">
          デザインから実装・運用まで。レベルは「実務でどこまで任せられるか」を基準にしています。
        </SectionHeading>

        <div className="skill-legend" aria-label="レベルの目安">
          {skillLegend.map((l) => (
            <span key={l.level} className="skill-legend__item">
              <Pips level={l.level} />
              <span>
                <span className="pixel skill-legend__lv">Lv.{l.level}</span> {l.label}
              </span>
            </span>
          ))}
        </div>

        <div className="skill-grid">
          {skillCategories.map((c, i) => (
            <SkillCard key={c.id} category={c} index={i} />
          ))}
        </div>

        <div className="learning pixel-box">
          <p className="learning__label pixel">修行中</p>
          <ul className="tag-list">
            {learning.map((l) => (
              <li key={l} className="tag tag--outline">
                {l}
              </li>
            ))}
          </ul>
          <TreasureChest id="skills" className="learning__chest" />
        </div>
      </div>
    </section>
  );
}
