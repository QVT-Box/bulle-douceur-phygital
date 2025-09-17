// src/components/FloatingBubbles.tsx
import React from "react";

type Bubble = {
  size: number;                    // en px
  pos: React.CSSProperties;        // top/left/right/bottom en %
  opacity: number;                 // 0–1
  delay: string;                   // "Xs"
  classes: string;                 // variantes d'animations
  desktopOnly?: boolean;           // masquée en mobile
};

const BUBBLES: Bubble[] = [
  // ---- pack “léger” (visible aussi en mobile) ----
  { size: 24, pos: { top: "30%", right: "20%" }, opacity: 0.10, delay: "5s", classes: "animate-float animate-pulse-soft" },
  { size: 40, pos: { bottom: "40%", left: "60%" }, opacity: 0.15, delay: "7s", classes: "animate-float animate-glow" },
  { size: 56, pos: { top: "70%", right: "40%" }, opacity: 0.10, delay: "2.5s", classes: "animate-float animate-pulse-soft" },
  { size: 32, pos: { top: "15%", left: "15%" }, opacity: 0.20, delay: "1s", classes: "animate-wiggle" },

  // ---- bulles supplémentaires (desktop only) ----
  { size: 48, pos: { bottom: "20%", right: "25%" }, opacity: 0.15, delay: "3s", classes: "animate-pulse-soft", desktopOnly: true },
  { size: 64, pos: { top: "50%", left: "80%" }, opacity: 0.10, delay: "4s", classes: "animate-float animate-glow", desktopOnly: true },
  { size: 16, pos: { top: "80%", left: "30%" }, opacity: 0.25, delay: "6s", classes: "animate-wiggle", desktopOnly: true },
];

const FloatingBubbles = React.memo(() => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
      role="presentation"
    >
      {/* bulles “pilotées” */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className={[
            "absolute rounded-full bg-gradient-bubble will-change-transform",
            b.classes,
            b.desktopOnly ? "hidden md:block" : "",
          ].join(" ")}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            animationDelay: b.delay,
            ...b.pos,
          }}
        />
      ))}
    </div>
  );
});

export default FloatingBubbles;
