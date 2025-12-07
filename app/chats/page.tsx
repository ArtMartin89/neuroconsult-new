"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const demoPages = [
  { name: "Демо 1 этаж", path: "/demos/demo-floor1", description: "Демонстрация работы с первым этажом" },
  { name: "Демо NPS", path: "/demos/demo-nps-floor", description: "Демонстрация системы NPS" },
];

export default function ChatsPage() {
  return (
    <>
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
        </div>
      </header>

      <main className="min-h-screen pb-8">
        <div className="mx-auto max-w-4xl px-6 pt-8 sm:px-10 lg:px-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Чаты и демо
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Выберите чат или демонстрацию для тестирования наших решений
            </p>
          </div>

          {/* Chat AI Button */}
          <div className="mb-12">
            <Link href="/chatai">
              <Button
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                Чат с ИИ-ассистентом NeuroConsult
              </Button>
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              Задавайте вопросы нашему AI-ассистенту
            </p>
          </div>

          {/* Demo Section */}
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-semibold text-white">Демо</h2>
              <p className="mt-1 text-sm text-slate-400">
                Попробуйте наши демонстрационные решения
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {demoPages.map((demo) => (
                <Link key={demo.path} href={demo.path}>
                  <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:bg-white/10 hover:border-accent/30">
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                      {demo.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {demo.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Перейти к демо →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}