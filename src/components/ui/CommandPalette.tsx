import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Contact,
  FileText,
  Mail,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
  User,
} from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "../icons/BrandIcons";
import { useTheme } from "../../context/ThemeContext";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { profile, socials } from "../../data/resume";
import { navSections } from "../../data/navigation";

type PaletteIcon = ComponentType<{ size?: number; className?: string }>;

interface CommandItem {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Connect";
  icon: PaletteIcon;
  keywords?: string;
  perform: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onEasterEgg: () => void;
}

const NAV_ICONS: Record<string, PaletteIcon> = {
  home: Sparkles,
  about: User,
  skills: Sparkles,
  experience: FileText,
  projects: FileText,
  education: FileText,
  contact: Contact,
};

export function CommandPalette({ open, onClose, onEasterEgg }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(open);

  const items: CommandItem[] = useMemo(
    () => [
      ...navSections.map((section) => ({
        id: `nav-${section.id}`,
        label: `Go to ${section.label}`,
        group: "Navigate" as const,
        icon: NAV_ICONS[section.id] ?? ArrowRight,
        perform: () => {
          document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      {
        id: "theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions" as const,
        icon: theme === "dark" ? SunMedium : MoonStar,
        keywords: "theme dark light appearance",
        perform: toggleTheme,
      },
      {
        id: "resume",
        label: "Download resume",
        group: "Actions" as const,
        icon: FileText,
        keywords: "cv pdf download",
        perform: () => window.open(profile.resumeUrl, "_blank"),
      },
      {
        id: "easter-egg",
        label: "✨ Do something fun",
        group: "Actions" as const,
        icon: Sparkles,
        keywords: "confetti easter egg surprise fun",
        perform: onEasterEgg,
      },
      {
        id: "email",
        label: `Copy email — ${profile.email}`,
        group: "Connect" as const,
        icon: Mail,
        keywords: "contact mail",
        perform: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "github",
        label: "Open GitHub profile",
        group: "Connect" as const,
        icon: GithubIcon,
        keywords: "code repos",
        perform: () => window.open(socials.find((s) => s.icon === "github")?.href, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        group: "Connect" as const,
        icon: LinkedinIcon,
        keywords: "career network",
        perform: () => window.open(socials.find((s) => s.icon === "linkedin")?.href, "_blank"),
      },
    ],
    [theme, toggleTheme, onEasterEgg],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) {
          item.perform();
          onClose();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, activeIndex, onClose]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search size={16} className="text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, toggle theme, connect…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <kbd className="hidden sm:inline rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-ink-faint">No matches. Try another search.</p>
              )}

              {(["Navigate", "Actions", "Connect"] as const).map((group) => {
                const groupItems = filtered.filter((item) => item.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="px-2 py-1">
                    <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      runningIndex += 1;
                      const isActive = runningIndex === activeIndex;
                      const Icon = item.icon;
                      const thisIndex = runningIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActiveIndex(thisIndex)}
                          onClick={() => {
                            item.perform();
                            onClose();
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-100 ${
                            isActive ? "bg-accent-soft text-ink" : "text-ink-muted"
                          }`}
                        >
                          <Icon size={15} className={isActive ? "text-accent" : "text-ink-faint"} />
                          <span className="flex-1 truncate">{item.label}</span>
                          {isActive && <ArrowRight size={13} className="text-accent" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
