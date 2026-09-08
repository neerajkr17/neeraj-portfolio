import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Badge({ children, active, interactive, onClick, className = "" }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200";
  const styles = active
    ? "border-accent bg-accent text-accent-ink"
    : "border-border bg-surface text-ink-muted hover:border-border-strong hover:text-ink";

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${styles} cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  }

  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}
