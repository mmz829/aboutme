import { useRef, useState, type KeyboardEvent } from 'react';
import { profile, status } from '../../data/profile';
import { useTypewriter } from '../../hooks/useTypewriter';
import { PixelSprite } from '../ui/PixelSprite';
import { heroSprite } from '../ui/sprites';
import { Window } from '../ui/Window';
import './Hero.css';

/** Matches the breakpoint where the choices collapse to one column in Hero.css */
const ONE_COLUMN_QUERY = '(max-width: 760px)';

function ChoiceMenu() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const count = profile.choices.length;

  const move = (next: number) => {
    const index = (next + count) % count;
    setActive(index);
    refs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const focused = refs.current.indexOf(document.activeElement as HTMLAnchorElement);
    const current = focused === -1 ? active : focused;
    const cols = window.matchMedia(ONE_COLUMN_QUERY).matches ? 1 : 2;
    if (e.key === 'ArrowDown') move(current + cols);
    else if (e.key === 'ArrowUp') move(current - cols);
    else if (e.key === 'ArrowRight') move(current + 1);
    else if (e.key === 'ArrowLeft') move(current - 1);
    else if (e.key === 'Home') move(0);
    else if (e.key === 'End') move(count - 1);
    else return;
    e.preventDefault();
  };

  return (
    <nav className="choices" aria-label="見たい情報を選ぶ">
      <ul className="choices__list" onKeyDown={onKeyDown}>
        {profile.choices.map((c, i) => (
          <li key={c.href}>
            <a
              ref={(el) => {
                refs.current[i] = el;
              }}
              href={c.href}
              className={`choices__item ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="choices__cursor" aria-hidden="true">
                ▶
              </span>
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MessageWindow() {
  const text = profile.greeting.join('\n');
  const { output, done, skip } = useTypewriter(text, 32);

  return (
    <div className="message pixel-box">
      <p className="visually-hidden">{profile.greeting.join(' ')}</p>
      <p className="message__text" aria-hidden="true" onClick={skip}>
        {output}
        {!done && <span className="message__caret" />}
      </p>
      <ChoiceMenu />
      <p className="message__hint" aria-hidden="true">
        ↑↓←→ でえらぶ　Enter でけってい
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="screen pixel-box">
          <div className="screen__sky" aria-hidden="true">
            <span className="screen__moon" />
          </div>

          <div className="screen__layout">
            <Window className="hero-status">
              <h1 id="hero-title" className="hero-status__name">
                <span className="hero-status__rule" aria-hidden="true" />
                <span className="hero-status__label">{profile.name}</span>
                <span className="hero-status__rule" aria-hidden="true" />
              </h1>
              <p className="hero-status__role">{profile.roleJa}</p>
              <dl className="hero-status__list">
                <div>
                  <dt>Lv</dt>
                  <dd>
                    <span className="hero-status__lv">{profile.level}</span>
                    <span className="hero-status__sub">（{profile.levelNote}）</span>
                  </dd>
                </div>
                <div>
                  <dt>とくい</dt>
                  <dd>{status.element}</dd>
                </div>
                <div>
                  <dt>きょてん</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
            </Window>

            <div className="hero-stage" aria-hidden="true">
              <span className="hero-stage__shadow" />
              <PixelSprite rows={heroSprite.rows} palette={heroSprite.palette} className="hero-stage__sprite" />
            </div>

            <MessageWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
