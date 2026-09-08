import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { allTags, projects } from "../../data/resume";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";

export function Projects() {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <section id="projects" className="scroll-mt-16 border-t border-border bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Engagements worth a closer look."
          description="Filter by stack to see how each engagement was built."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            <Badge interactive active={activeTag === "All"} onClick={() => setActiveTag("All")}>
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge key={tag} interactive active={activeTag === tag} onClick={() => setActiveTag(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-ink">{project.title}</h3>
                      <p className="text-xs text-ink-faint">
                        {project.company} · {project.period}
                      </p>
                    </div>
                    {project.featured && (
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                        title="Secure auth engagement (Keycloak / OAuth 2.0)"
                      >
                        <ShieldCheck size={14} />
                      </span>
                    )}
                  </div>

                  <p className="mt-3 flex-1 text-sm text-ink-muted">{project.summary}</p>

                  <ul className="mt-4 space-y-1.5 text-xs text-ink-muted">
                    {project.bullets.slice(1, 3).map((bullet) => (
                      <li key={bullet} className="flex gap-1.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} active={tag === activeTag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-faint">No engagements match that filter.</p>
        )}
      </div>
    </section>
  );
}
