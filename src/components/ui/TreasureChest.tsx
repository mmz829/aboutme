import { useGame } from '../../context/GameContext';
import { PixelSprite } from './PixelSprite';
import { chestClosed, chestOpen } from './sprites';
import './TreasureChest.css';

type Props = { id: string; className?: string };

export function TreasureChest({ id, className = '' }: Props) {
  const { found, openChest } = useGame();
  const isOpen = found.has(id);
  const sprite = isOpen ? chestOpen : chestClosed;

  return (
    <button
      type="button"
      className={`chest ${isOpen ? 'is-open' : ''} ${className}`}
      onClick={() => openChest(id)}
      aria-label={isOpen ? '開けた宝箱' : '隠された宝箱を開ける'}
      aria-pressed={isOpen}
    >
      <PixelSprite rows={sprite.rows} palette={sprite.palette} className="chest__sprite" />
    </button>
  );
}
