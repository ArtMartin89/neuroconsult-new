'use client'

import { Button } from '@/components/ui/Button'
import { ArrowDown } from 'lucide-react'

export const HeroBlock = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('conversion-form')
    formSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Abstract geometric SVG background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#007BFF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#007BFF', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
          <rect x="60%" y="20%" width="300" height="300" fill="none" stroke="#007BFF" strokeWidth="2" opacity="0.3" />
          <polygon points="80%,70% 90%,50% 95%,70% 85%,85%" fill="none" stroke="#007BFF" strokeWidth="2" opacity="0.2" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50% 50%;360 50% 50%"
            dur="20s"
            repeatCount="indefinite"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
          Выйдите из операционки и превратите бизнес в управляемую систему
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
          Построим работающую систему управления с ИИ-контролем — чтобы ваш бизнес приносил стабильную прибыль, пока вы занимаетесь стратегией, а не тушите пожары
        </p>

        <p className="text-lg text-accent mb-10 font-medium">
          Системный консалтинг + AI-автоматизация = Измеримый рост по всем направлениям уже через 3 месяца
        </p>

        <Button
          size="lg"
          onClick={scrollToForm}
          className="mb-8"
        >
          Получить бесплатную диагностику вашего бизнеса
        </Button>

        <div className="flex justify-center mt-12 animate-bounce">
          <ArrowDown className="w-6 h-6 text-accent" />
        </div>
      </div>
    </section>
  )
}

