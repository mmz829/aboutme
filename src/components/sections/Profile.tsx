import type { CSSProperties } from 'react';
import { profile, status } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TreasureChest } from '../ui/TreasureChest';
import './Profile.css';

export function Profile() {
  const card = useReveal<HTMLDivElement>();
  const text = useReveal<HTMLDivElement>();

  return (
    <section id="profile" className="section" aria-labelledby="profile-title">
      <div className="container">
        <SectionHeading index="01" eyebrow="STATUS" title="プロフィール" id="profile-title">
          どんな人で、何が得意なのか。ひと目で分かるようにまとめました。
        </SectionHeading>

        <div className="profile">
          <div
            ref={card.ref}
            className={`panel status ${card.className} ${card.visible ? 'is-visible' : ''}`}
          >
            <header className="panel__head">
              <p className="panel__kicker">STATUS</p>
              <p className="panel__title">ステータス</p>
            </header>
            <dl className="status__list">
              <div className="status__row">
                <dt>なまえ</dt>
                <dd>{profile.name}</dd>
              </div>
              <div className="status__row">
                <dt>しょくぎょう</dt>
                <dd>
                  {status.className}
                  <span className="status__sub">{status.classNote}</span>
                </dd>
              </div>
              <div className="status__row">
                <dt>レベル</dt>
                <dd>
                  <span className="status__level">Lv.{profile.level}</span>
                  <span className="status__sub">{profile.levelNote}</span>
                </dd>
              </div>
              <div className="status__row">
                <dt>せいかく</dt>
                <dd>
                  {status.mbti}
                  <span className="status__sub">{status.mbtiNote}</span>
                </dd>
              </div>
              <div className="status__row">
                <dt>けいけん</dt>
                <dd>{status.element}</dd>
              </div>
              <div className="status__row">
                <dt>きょてん</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="status__row">
                <dt>そうび</dt>
                <dd>
                  <ul className="tag-list">
                    {status.equipment.map((e) => (
                      <li key={e} className="tag">
                        {e}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="params">
              <p className="params__title">
                パラメータ <span className="status__sub">（自己評価）</span>
              </p>
              <ul className="params__list">
                {status.params.map((p, i) => (
                  <li key={p.label} className="param">
                    <div className="param__head">
                      <span>{p.label}</span>
                      <span className="param__value">{p.value}</span>
                    </div>
                    <div
                      className="param__bar"
                      role="meter"
                      aria-label={p.label}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={p.value}
                      aria-valuetext={`${p.value} / 100 — ${p.note}`}
                    >
                      <span
                        className="param__fill"
                        style={{ '--value': p.value / 100, '--delay': `${i * 90}ms` } as CSSProperties}
                      />
                    </div>
                    <p className="param__note">{p.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={text.ref}
            className={`panel about ${text.className}`}
            style={{ '--reveal-delay': '120ms' } as CSSProperties}
          >
            <header className="panel__head">
              <p className="panel__kicker">ABOUT</p>
              <p className="panel__title">{profile.name} について</p>
            </header>
            <h3 className="visually-hidden">{profile.name} について</h3>
            {status.about.map((p) => (
              <p key={p.slice(0, 12)} className="about__text">
                {p}
              </p>
            ))}

            <h3 className="about__subtitle">大切にしていること</h3>
            <ol className="values">
              {status.values.map((v, i) => (
                <li key={v.title} className="value">
                  <span className="value__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="value__title">{v.title}</p>
                    <p className="value__body">{v.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="about__chest">
              <TreasureChest id="status" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
