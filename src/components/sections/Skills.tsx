import { Blocks, Code2, FlaskConical, Layers, Users, Wrench } from "lucide-react";
import { skillGroups } from "../../data/resume";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";

const GROUP_ICONS: Record<string, typeof Code2> = {
  Languages: Code2,
  Frameworks: Layers,
  Libraries: Blocks,
  Testing: FlaskConical,
  "Tools & Platforms": Wrench,
  "Soft Skills": Users,
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-t border-border bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A well-rounded, security-minded frontend toolkit."
          description="Languages, frameworks and tooling I reach for daily to ship accessible, maintainable React applications."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = GROUP_ICONS[group.title] ?? Code2;
            return (
              <Reveal key={group.title} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon size={16} />
                    </span>
                    <h3 className="font-semibold text-ink">{group.title}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
