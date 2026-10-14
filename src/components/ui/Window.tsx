import type { ElementType, ReactNode } from 'react';
import './Window.css';

type WindowProps = {
  label?: string;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** RPGのステータスウィンドウを思わせる、細い枠の共通フレーム */
export function Window({ label, as: Tag = 'div', className = '', children }: WindowProps) {
  return (
    <Tag className={`window pixel-box ${className}`}>
      {label && (
        <span className="window__label pixel-tab" aria-hidden="true">
          {label}
        </span>
      )}
      {children}
    </Tag>
  );
}
