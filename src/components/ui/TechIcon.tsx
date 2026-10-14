import { resolveTechIcons } from '../../data/techIcons';
import './TechIcon.css';

type Props = {
  name: string;
  icons?: string[];
};

export function TechIcons({ name, icons }: Props) {
  const items = resolveTechIcons(name, icons);
  if (items.length === 0) return null;
  return (
    <span className="tech-icons" aria-hidden="true">
      {items.map((item) => (
        <img key={item.id} className="tech-icon" src={item.src} alt="" width={16} height={16} />
      ))}
    </span>
  );
}

export function TechLabel({ name, icons }: Props) {
  return (
    <span className="tech-label">
      <TechIcons name={name} icons={icons} />
      {name}
    </span>
  );
}
