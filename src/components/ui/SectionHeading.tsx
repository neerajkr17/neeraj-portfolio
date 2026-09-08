import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto max-w-2xl" : ""}`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-base md:text-lg text-ink-muted text-balance">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
