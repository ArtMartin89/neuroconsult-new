import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-accent/50 bg-accent/10 text-sm font-semibold text-accent">
              NΞ
            </span>
            <span className="text-sm font-semibold tracking-[0.35em] text-foreground/80">
              NeuroConsult
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <nav className="flex gap-6 text-sm text-foreground/60">
              <a href="#hero" className="hover:text-accent transition-colors">
                Главная
              </a>
              <a href="#pain-points" className="hover:text-accent transition-colors">
                Проблемы
              </a>
              <a href="#cvp" className="hover:text-accent transition-colors">
                Решение
              </a>
              <a href="#expertise" className="hover:text-accent transition-colors">
                Экспертиза
              </a>
            </nav>

            <Link
              href="/chats"
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/20 px-4 py-2 text-sm uppercase tracking-[0.35em] text-accent transition hover:bg-accent/40"
            >
              Чат с ИИ
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © 2024 NeuroConsult. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}