import { useGame } from '../../context/GameContext';
import './ToastRegion.css';

export function ToastRegion() {
  const { toasts, dismiss } = useGame();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast pixel-box toast--${toast.tone ?? 'gold'}`}>
          <span className="toast__mark pixel" aria-hidden="true">
            ★
          </span>
          <div className="toast__body">
            <p className="toast__title">{toast.title}</p>
            {toast.message && <p className="toast__message">{toast.message}</p>}
          </div>
          <button
            type="button"
            className="toast__close"
            onClick={() => dismiss(toast.id)}
            aria-label="通知を閉じる"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
