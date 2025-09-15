import * as React from "react";

export const MOBILE_BREAKPOINT = 768; // px

export function useIsMobile(): boolean {
  // SSR-safe: valeur initiale sans "window"
  const getInitial = () =>
    typeof window === "undefined" ? false : window.innerWidth < MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = React.useState<boolean>(getInitial);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const update = () => setIsMobile(mql.matches);

    // Écoute moderne + fallback Safari < 14
    const addMqlListener = () => {
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
      } else {
        // @ts-expect-error: anciens types
        mql.addListener(update);
        // @ts-expect-error: anciens types
        return () => mql.removeListener(update);
      }
    };

    // Fallback supplémentaire sur "resize" (certaines implémentations exotiques)
    const onResize = () => {
      // rAF pour lisser les rafales de resize
      requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);

    // Init immédiate
    update();

    const removeMql = addMqlListener();

    return () => {
      removeMql?.();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
