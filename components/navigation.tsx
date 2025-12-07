"use client";

import { navigationLinks } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((state) => !state);

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/50 bg-accent/10 text-lg font-semibold text-accent shadow-[0_0_30px_rgba(0,123,255,0.35)] group-hover:shadow-[0_0_40px_rgba(0,123,255,0.45)]">
            NΞ
          </span>
          <span className="text-sm font-semibold tracking-[0.35em] text-foreground/80">
            NeuroConsult
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 sm:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/chatai"
            className="inline-flex items-center rounded-full border border-accent/50 bg-accent/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-accent transition hover:bg-accent/40"
          >
            Чат с ИИ
          </Link>
        </nav>

        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-foreground transition hover:border-white/30 hover:bg-white/10 sm:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mx-4 mb-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm font-medium text-foreground">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/[0.02] px-4 py-3 text-foreground/80 transition hover:bg-white/10 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/chatai"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-center text-accent transition hover:bg-accent/20"
            >
              Чат с ИИ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}