'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Zap, Network, TrendingUp, DollarSign, Target, Settings, Users, BarChart3 } from 'lucide-react'

const levels = [
  {
    icon: Zap,
    title: 'ИИ-микросервисы',
    subtitle: 'быстрый старт, точечные решения',
    items: [
      'Ассистенты для ключевых сотрудников',
      'Автоматическая обработка рутины (заявки, документы, отчёты)',
      'ИИ-контроль критичных процессов',
      'Быстрые победы за 2-4 недели'
    ]
  },
  {
    icon: Network,
    title: 'Автоматизация и прозрачность',
    subtitle: 'основа системы',
    items: [
      'Единое информационное пространство',
      'Автоматический сбор данных со всех направлений',
      'Объективная картина бизнеса в реальном времени',
      'Контроль без микроменеджмента'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Системный рост',
    subtitle: 'стратегия и масштабирование',
    items: [
      'Выстраивание процессов по всем функциям',
      'Оптимизация финансов и маржинальности',
      'Построение управленческой команды',
      'Превращение хаоса в предсказуемую прибыль'
    ]
  }
]

const directions = [
  { icon: DollarSign, title: 'Финансы и управленческий учёт', desc: 'Прозрачность движения денег, контроль маржинальности, предсказуемость кэша' },
  { icon: Target, title: 'Продажи и маркетинг', desc: 'Системная генерация и конверсия лидов, автоматизация воронки, возврат клиентов' },
  { icon: Settings, title: 'Операционные процессы', desc: 'Производство, логистика, закупки — выстраивание потока от заявки до денег' },
  { icon: Users, title: 'HR и управление командой', desc: 'Найм, адаптация, KPI, мотивация — чтобы люди работали без ручного контроля' },
  { icon: BarChart3, title: 'Стратегия и развитие', desc: 'Системное планирование, тестирование гипотез роста, масштабирование' }
]

export const CVPSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
          Почему точечные решения не работают: вам нужна система
        </h2>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 md:p-8 mb-12">
          <p className="text-lg font-semibold mb-4 text-foreground">
            Проблема не в отдельных инструментах — проблема в отсутствии целостной системы управления
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>• Новая CRM не поможет, если процессы не выстроены</li>
            <li>• Управленец со стороны не знает вашу специфику</li>
            <li>• Автоматизация без стратегии просто ускорит хаос</li>
            <li>• Точечные улучшения в одном отделе создают бутылочное горлышко в другом</li>
            <li>• Бизнес держится на вас, а не на системе — и это главная уязвимость</li>
          </ul>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-4 text-accent">
            Синергия системного консалтинга и ИИ-автоматизации
          </h3>
          <p className="text-center text-slate-300 max-w-4xl mx-auto mb-6">
            Мы не продаём вам «волшебный ИИ» или «готовый регламент». Мы строим управляемую систему бизнеса, где:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <Card className="text-center">
              <p className="text-slate-300">
                <span className="text-accent font-semibold">✓ Системный консалтинг</span> выстраивает процессы по всем направлениям и устраняет организационный хаос
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-slate-300">
                <span className="text-accent font-semibold">✓ ИИ</span> автоматизирует контроль, связывает данные и исключает человеческий фактор
              </p>
            </Card>
            <Card className="text-center">
              <p className="text-slate-300">
                <span className="text-accent font-semibold">✓ Измеримый результат</span> — вы видите ROI в цифрах по каждому направлению, а не в обещаниях
              </p>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Комплексный подход по трём уровням:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level, index) => {
              const Icon = level.icon
              return (
                <Card key={index} hover>
                  <div className="flex flex-col items-center text-center mb-4">
                    <Icon className="w-12 h-12 text-accent mb-4" />
                    <h4 className="text-xl font-semibold mb-2 text-foreground">{level.title}</h4>
                    <p className="text-sm text-slate-400 mb-4">{level.subtitle}</p>
                  </div>
                  <ul className="space-y-2">
                    {level.items.map((item, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start">
                        <span className="text-accent mr-2">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mb-12 text-center">
          <Button
            size="lg"
            onClick={() => {
              document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Заказать комплексный подход
          </Button>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Направления работы:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions.map((dir, index) => {
              const Icon = dir.icon
              return (
                <Card key={index} hover>
                  <div className="flex gap-4">
                    <Icon className="w-8 h-8 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{dir.title}</h4>
                      <p className="text-sm text-slate-300">{dir.desc}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mt-12 bg-slate-800 border border-accent rounded-lg p-6 max-w-4xl mx-auto">
          <p className="text-slate-300 text-center">
            <span className="font-semibold text-accent">Ключевое отличие:</span> Мы входим через доступные ИИ-решения, которые дают быстрый эффект. А параллельно выстраиваем системный фундамент для долгосрочного роста. Вы не переплачиваете за «большой консалтинг» на старте, но получаете комплексную стратегию.
          </p>
        </div>
      </div>
    </section>
  )
}

