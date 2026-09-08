import { useInView } from "framer-motion";
import { useRef } from "react";
import { profile, stats } from "../../data/resume";
import { useCountUp } from "../../hooks/useCountUp";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function StatCard({ label, value, suffix, delay }: { label: string; value: number; suffix?: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const animated = useCountUp(value, inView);

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-border-strong"
      >
        <p className="font-mono text-3xl sm:text-4xl font-semibold text-ink">
          {animated}
          {suffix}
        </p>
        <p className="mt-1 text-sm text-ink-muted">{label}</p>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="About" title="Building thoughtful interfaces, one sprint at a time." />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-5">
            <Reveal>
              <p className="text-lg text-ink-muted text-balance">{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg text-ink-muted text-balance">
                Currently building merchant onboarding and operations tooling at{" "}
                <span className="text-ink">Rayvector Technologies</span>, after two years shipping
                fintech and public-sector portals at <span className="text-ink">Keen &amp; Able Computers</span>.
                I care about clean component architecture, secure-by-default auth flows, and UI that
                stays fast under real-world data.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ul className="flex flex-wrap gap-2 pt-2">
                {["React.js", "TypeScript", "Next.js", "Redux", "Keycloak / OAuth 2.0", "AWS"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-bg-soft px-3 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
