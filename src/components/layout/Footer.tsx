import { useGame } from '../../context/GameContext';
import { profile, treasures } from '../../data/profile';
import './Footer.css';

export function Footer() {
  const { found } = useGame();
  const complete = found.size === treasures.length;

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__thanks pixel">THANK YOU FOR PLAYING</p>

        <p className="footer__treasure">
          <span className="pixel footer__treasure-count">
            宝箱 {found.size} / {treasures.length}
          </span>
          <span className="footer__treasure-hint">
            {complete
              ? 'すべての宝箱を見つけました。ありがとうございます！'
              : 'このページのどこかに、小さな宝箱が隠れています。'}
          </span>
        </p>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React + TypeScript.
          </p>
          <a href="#top" className="footer__top">
            <span className="pixel" aria-hidden="true">
              ▲
            </span>
            ページの先頭へ
          </a>
        </div>
      </div>
    </footer>
  );
}
