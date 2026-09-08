import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface ConfettiProps {
  burstId: number;
}

const COLORS = ["var(--color-accent)", "#f6b04c", "#4cc9a0", "#f2789f"];

export function Confetti({ burstId }: ConfettiProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (burstId === 0) return;
    setActive(true);
    const timeout = setTimeout(() => setActive(false), 1700);
    return () => clearTimeout(timeout);
  }, [burstId]);

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: `${burstId}-${i}`,
        x: (Math.random() - 0.5) * 100,
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.15,
        drift: (Math.random() - 0.5) * 220,
      })),
    [burstId],
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] flex justify-center overflow-hidden">
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: -20, x: p.x, rotate: 0 }}
              animate={{ opacity: 0, y: 420, x: p.x + p.drift, rotate: p.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 80,
                width: p.size,
                height: p.size * 0.4,
                backgroundColor: p.color,
                borderRadius: 2,
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
