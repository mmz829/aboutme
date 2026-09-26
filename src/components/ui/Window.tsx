import type { ElementType, ReactNode } from 'react';
import './Window.css';

type WindowProps = {
  label?: string;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** 二重枠と金の角飾りで表現した、RPGのウィンドウ風の共通フレーム */
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
