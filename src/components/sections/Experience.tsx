import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { experience } from "../../data/resume";
import type { Engagement } from "../../types";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function EngagementItem({ engagement, defaultOpen }: { engagement: Engagement; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="rounded-xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor-hover
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
      >
        <div>
          <p className="font-medium text-ink">{engagement.name}</p>
          <p className="font-mono text-xs text-ink-faint">{engagement.period}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-ink-faint">
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <ul className="space-y-2 text-sm text-ink-muted">
                {engagement.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {engagement.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped."
          description="Two roles, six engagements — spanning fintech, government portals, and merchant tooling."
        />

        <div className="relative space-y-16 border-l border-border pl-8 sm:ml-3 sm:pl-10">
          {experience.map((entry, entryIndex) => (
            <Reveal key={entry.company} delay={entryIndex * 0.1}>
              <div className="relative">
                <span
                  className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[calc(2.5rem+5px)]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-ink">
                    {entry.role} <span className="text-ink-faint font-normal">· {entry.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-ink-faint">{entry.period}</span>
                </div>
                <p className="mt-1 text-sm text-ink-faint">{entry.location}</p>

                <div className="mt-6 space-y-3">
                  {entry.engagements.map((engagement, i) => (
                    <EngagementItem key={engagement.name} engagement={engagement} defaultOpen={entryIndex === 0 && i === 0} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
