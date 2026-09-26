import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Career } from './components/sections/Career';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Profile } from './components/sections/Profile';
import { Skills } from './components/sections/Skills';
import { ToastRegion } from './components/ui/ToastRegion';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Profile />
        <Skills />
        <Career />
        <Contact />
      </main>
      <Footer />
      <ToastRegion />
    </GameProvider>
  );
}
