import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { profile, socials } from "../../data/resume";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail, phone: Phone };

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-ink">
            <span className="text-accent">{"<"}</span>Neeraj Kumar<span className="text-accent">{" />"}</span>
          </p>
          <p className="mt-1 text-sm text-ink-faint">Built with React, TypeScript &amp; Tailwind CSS.</p>
        </div>

        <div className="flex items-center gap-3">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>

        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
