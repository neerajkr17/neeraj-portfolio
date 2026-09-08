import { motion } from "framer-motion";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../../data/resume";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function CopyRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — the href link still works as a fallback
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors duration-300 hover:border-border-strong">
      <a href={href} className="flex min-w-0 items-center gap-3" data-cursor-hover>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon size={15} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-ink-faint">{label}</span>
          <span className="block truncate text-sm text-ink">{value}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label.toLowerCase()}`}
        data-cursor-hover
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-faint transition-colors duration-200 hover:bg-bg-soft hover:text-ink"
      >
        {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      </button>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something secure and delightful."
          description="Have a role, project, or just want to talk frontend architecture? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="space-y-3">
            <Reveal>
              <CopyRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            </Reveal>
            <Reveal delay={0.06}>
              <CopyRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <MapPin size={15} />
                </span>
                <span>
                  <span className="block text-xs text-ink-faint">Location</span>
                  <span className="block text-sm text-ink">{profile.location}</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-ink-muted">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
                    placeholder="Ada Lovelace"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-ink-muted">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-ink-muted">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
                  placeholder="Let's talk about…"
                />
              </label>

              <button
                type="submit"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
              >
                {sent ? "Opening your email client…" : "Send message"}
                <motion.span animate={sent ? { x: 4, y: -4 } : { x: 0, y: 0 }}>
                  <Send size={15} />
                </motion.span>
              </button>
              <p className="text-xs text-ink-faint">
                Opens your default email app with this message pre-filled — nothing is sent from here.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
