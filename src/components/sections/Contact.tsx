import { useGame } from '../../context/GameContext';
import { profile } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Contact.css';

export function Contact() {
  const { notify } = useGame();
  const reveal = useReveal<HTMLDivElement>();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify({ title: 'メールアドレスを 手に入れた！', message: `${profile.email} をコピーしました。` });
    } catch {
      notify({ title: 'コピーできませんでした', message: `お手数ですが ${profile.email} をご利用ください。` });
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading index="04" eyebrow="PARTY" title="お問い合わせ" id="contact-title" />

        <div ref={reveal.ref} className={`contact__layout ${reveal.className}`}>
          <div className="panel contact__main">
            <header className="panel__head">
              <p className="panel__kicker">PARTY</p>
              <p className="panel__title">おさそい</p>
            </header>
            <p className="contact__lead">一緒に冒険してくれる仲間を探しています。</p>
            <p className="contact__text">
              お仕事のご相談、カジュアル面談、ポートフォリオへのご感想など、お気軽にご連絡ください。通常2営業日以内にお返事します。
            </p>
            <div className="contact__actions">
              <a href={`mailto:${profile.email}`} className="btn btn--primary">
                メールを送る
              </a>
              <button type="button" className="btn" onClick={copyEmail}>
                アドレスをコピー
              </button>
            </div>
            <p className="contact__email">{profile.email}</p>
          </div>

          <div className="panel contact__side">
            <header className="panel__head">
              <p className="panel__kicker">LINKS</p>
            </header>
            <ul className="contact__links">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="contact__link" target="_blank" rel="noreferrer">
                    <span>{s.label}</span>
                    <span className="contact__link-handle">{s.handle}</span>
                    <span className="visually-hidden">（新しいタブで開く）</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
