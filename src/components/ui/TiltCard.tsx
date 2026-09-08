import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const canTilt =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, var(--color-accent-soft), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
