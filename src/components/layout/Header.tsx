import { useEffect, useRef, useState } from 'react';
import { navItems, sectionIds } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import './Header.css';

export function Header() {
  const progress = useScrollProgress();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const levelUp = progress > 0.985;

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (!open) return;

    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className={`header ${progress > 0.01 ? 'is-scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#top" className="header__logo" onClick={() => setOpen(false)}>
          <span className="header__logo-mark pixel" aria-hidden="true">
            C
          </span>
          <span className="header__logo-text">
            <span className="header__logo-name">{profile.name}</span>
            <span className="header__logo-role">{profile.role}</span>
          </span>
        </a>

        <nav className="header__nav" aria-label="メインナビゲーション">
          <ul className="nav-list">
            {navItems.slice(0, -1).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  <span className="nav-link__cursor pixel" aria-hidden="true">
                    ▶
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--primary header__cta">
            お問い合わせ
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={`header__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'メニューを閉じる' : 'メニューを開く'}</span>
          <span className="header__toggle-bar" aria-hidden="true" />
          <span className="header__toggle-bar" aria-hidden="true" />
        </button>
      </div>

      <div className="exp" aria-hidden="true">
        <div className="exp__track">
          <div className="exp__fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <span className={`exp__label pixel ${levelUp ? 'is-levelup' : ''}`}>
          {levelUp ? 'LEVEL UP!' : `EXP ${Math.round(progress * 100)}%`}
        </span>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="モバイルナビゲーション" className="mobile-menu__window pixel-box">
          <p className="pixel-tab" aria-hidden="true">
            MENU
          </p>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="mobile-menu__link"
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  <span className="mobile-menu__cursor pixel" aria-hidden="true">
                    ▶
                  </span>
                  <span>{item.label}</span>
                  <span className="mobile-menu__en pixel" aria-hidden="true">
                    {item.en}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
