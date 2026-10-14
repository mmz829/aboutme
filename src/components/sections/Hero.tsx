import { useRef, useState, type KeyboardEvent } from 'react';
import { profile, status } from '../../data/profile';
import { useTypewriter } from '../../hooks/useTypewriter';
import { PixelSprite } from '../ui/PixelSprite';
import { heroSprite } from '../ui/sprites';
import './Hero.css';

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
    <nav className="panel panel--dialog hero-choices" aria-label="見たい情報を選ぶ">
      <ul className="hero-choices__list" onKeyDown={onKeyDown}>
        {profile.choices.map((c, i) => (
          <li key={c.href}>
            <a
              ref={(el) => {
                refs.current[i] = el;
              }}
              href={c.href}
              className={`hero-choices__item ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="hero-choices__cursor" aria-hidden="true">
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

export function Hero() {
  const text = profile.greeting.join('\n');
  const { output, done, skip } = useTypewriter(text, 32);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__field">
        <div className="hero__sky" aria-hidden="true">
          <span className="hero__moon" />
        </div>
        <div className="hero__mountains" aria-hidden="true" />
        <div className="hero__ground" aria-hidden="true" />

        <div className="hero__identity">
          <p className="hero__kicker">{profile.role}</p>
          <h1 id="hero-title" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__role">{profile.roleJa}</p>
          <dl className="hero__meta">
            <div>
              <dt>Lv</dt>
              <dd>
                {profile.level}
                <span> / {profile.levelNote}</span>
              </dd>
            </div>
            <div>
              <dt>けいけん</dt>
              <dd>{status.element}</dd>
            </div>
            <div>
              <dt>きょてん</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__land">
          <div className="hero__stage" aria-hidden="true">
            <span className="hero__shadow" />
            <PixelSprite rows={heroSprite.rows} palette={heroSprite.palette} className="hero__sprite" />
          </div>

          <div className="hero__dialog">
            <div className="panel panel--dialog dialog-message">
              <p className="visually-hidden">{profile.greeting.join(' ')}</p>
              <p className="hero__line" aria-hidden="true" onClick={skip}>
                {output}
                {!done && <span className="hero__caret" />}
              </p>
            </div>
            <ChoiceMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
