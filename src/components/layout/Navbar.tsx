import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navSections } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { ThemeToggle } from "../ui/ThemeToggle";

interface NavbarProps {
  onOpenPalette: () => void;
}

export function Navbar({ onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(navSections.map((s) => s.id));

  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(id: string) {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-mono text-sm font-semibold tracking-tight text-ink"
          data-cursor-hover
        >
          <span className="text-accent">{"<"}</span>Neeraj Kumar<span className="text-accent">{" />"}</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(section.id);
                }}
                data-cursor-hover
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  activeId === section.id ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {activeId === section.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{section.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            data-cursor-hover
            className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-ink-faint transition-colors duration-200 hover:border-border-strong hover:text-ink-muted"
          >
            <Command size={13} />
            <span>Search</span>
            <kbd className="rounded border border-border px-1 font-mono text-[10px]">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor-hover
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink-muted md:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(section.id);
                    }}
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors duration-200 ${
                      activeId === section.id ? "bg-accent-soft text-ink" : "text-ink-muted"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPalette();
                  }}
                  className="mt-1 flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-ink-muted"
                >
                  <Command size={14} /> Open command palette
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
