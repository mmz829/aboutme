import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { treasures } from '../data/profile';

export type Toast = { id: number; title: string; message?: string; tone?: 'gold' | 'teal' };

type GameContextValue = {
  toasts: Toast[];
  notify: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: number) => void;
  found: Set<string>;
  openChest: (id: string) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

const STORAGE_KEY = 'aboutme:treasures';

function loadFound(): Set<string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [found, setFound] = useState<Set<string>>(loadFound);
  const foundRef = useRef(found);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const openChest = useCallback(
    (id: string) => {
      if (foundRef.current.has(id)) return;
      const treasure = treasures.find((t) => t.id === id);
      if (!treasure) return;

      const next = new Set(foundRef.current).add(id);
      foundRef.current = next;
      setFound(next);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* storage unavailable: progress simply won't persist */
      }

      notify({ title: `${treasure.item}を 手に入れた！`, message: treasure.message });
      if (next.size === treasures.length) {
        window.setTimeout(
          () =>
            notify({
              title: '実績解除：すみずみまで冒険した',
              message: '細部まで見てくださり、ありがとうございます。こういう人と一緒に働きたいです。',
              tone: 'teal',
            }),
          1200,
        );
      }
    },
    [notify],
  );

  const value = useMemo(
    () => ({ toasts, notify, dismiss, found, openChest }),
    [toasts, notify, dismiss, found, openChest],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
