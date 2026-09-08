import { GraduationCap } from "lucide-react";
import { education } from "../../data/resume";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Academic background." />

        <div className="grid gap-4 sm:grid-cols-3">
          {education.map((entry, i) => (
            <Reveal key={`${entry.school}-${entry.period}`} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <GraduationCap size={16} />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{entry.school}</h3>
                <p className="mt-1 text-sm text-ink-muted">{entry.credential}</p>
                <p className="mt-3 font-mono text-xs text-ink-faint">{entry.period}</p>
                <p className="text-xs text-ink-faint">{entry.location}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
