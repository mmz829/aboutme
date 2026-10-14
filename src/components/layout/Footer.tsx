import { useGame } from '../../context/GameContext';
import { profile, treasures } from '../../data/profile';
import './Footer.css';

export function Footer() {
  const { found } = useGame();
  const complete = found.size === treasures.length;

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div>
          <p className="footer__thanks">THANK YOU FOR PLAYING</p>
          <p className="footer__treasure">
            宝箱 {found.size} / {treasures.length}
            {' — '}
            {complete
              ? 'すべての宝箱を見つけました。'
              : 'このページのどこかに、小さな宝箱が隠れています。'}
          </p>
        </div>
        <div>
          <p className="footer__copy">
            © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React + TypeScript.
          </p>
          <a href="#top" className="footer__top">
            ページの先頭へ
          </a>
        </div>
      </div>
    </footer>
  );
}
