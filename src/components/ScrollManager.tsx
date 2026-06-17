import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles hash anchors (e.g. /#about) and resets scroll on route change.
 * Transition-driven navigation already scrolls to top itself.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
