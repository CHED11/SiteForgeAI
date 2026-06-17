import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type { CollectionId } from "../config/products";

type Phase = "cover" | "reveal";

export interface TransitionState {
  collection: CollectionId;
  phase: Phase;
}

interface TransitionContextValue {
  state: TransitionState | null;
  /** Animate a cinematic overlay, then navigate to a collection route. */
  enterCollection: (to: string, collection: CollectionId) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

// Cover = overlay sweeps in and hides the page. Reveal = it sweeps away.
const COVER_MS = 720;
const REVEAL_MS = 820;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState | null>(null);
  const navigate = useNavigate();
  const timers = useRef<number[]>([]);

  const enterCollection = useCallback(
    (to: string, collection: CollectionId) => {
      // Clear any in-flight transition timers.
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];

      if (prefersReducedMotion()) {
        navigate(to);
        window.scrollTo({ top: 0 });
        return;
      }

      setState({ collection, phase: "cover" });

      timers.current.push(
        window.setTimeout(() => {
          navigate(to);
          window.scrollTo({ top: 0 });
          setState({ collection, phase: "reveal" });
        }, COVER_MS)
      );

      timers.current.push(
        window.setTimeout(() => {
          setState(null);
        }, COVER_MS + REVEAL_MS)
      );
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ state, enterCollection }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
