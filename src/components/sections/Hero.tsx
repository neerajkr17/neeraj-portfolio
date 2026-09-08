import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { profile, socials } from "../../data/resume";
import { useTypewriter } from "../../hooks/useTypewriter";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail, phone: Phone };

export function Hero() {
  const typed = useTypewriter({ words: profile.taglineRoles });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Background: subtle grid + floating accent orbs, restrained for a minimal feel */}
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" aria-hidden />
      <div
        className="absolute -top-24 right-[8%] -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[100px] animate-float"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-[6%] -z-10 h-64 w-64 rounded-full bg-accent/10 blur-[100px] animate-float-slow"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-sm text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to new opportunities · {profile.location}
        </motion.p>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ink text-balance"
          >
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            <br />
            <span className="text-ink-muted">I build </span>
            <span className="relative text-accent">
              {typed}
              <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] animate-blink bg-accent align-middle" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted text-balance"
          >
            {profile.summary}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor-hover
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            View my work
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-border-strong"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <FileDown size={16} />
            Resume
          </a>

          <div className="ml-1 flex items-center gap-2">
            {socials.map((social) => {
              const Icon = ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  data-cursor-hover
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        aria-label="Scroll to About"
        data-cursor-hover
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
