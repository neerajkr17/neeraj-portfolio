import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, [data-cursor-hover]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovering ? 40 : 10,
          height: hovering ? 40 : 10,
          x: hovering ? -20 : -5,
          y: hovering ? -20 : -5,
          opacity: hovering ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
