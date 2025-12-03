import { Card } from '@/components/ui/Card'
import { TrendingUp, CheckCircle2 } from 'lucide-react'

const caseStudies = [
  {
    title: 'Производственная компания (металлообработка)',
    pain: 'Хаос в процессах, зависимость от собственника, постоянные кассовые разрывы при росте оборота',
    solutions: [
      'Выстроили сквозной процесс от заявки до оплаты',
      'Внедрили управленческий учёт с контролем маржи по проектам',
      'Автоматизировали планирование производства и закупок',
      'ИИ-ассистент для контроля сроков и качества'
    ],
    results: [
      { label: 'Чистая прибыль', value: '+125%', desc: 'с 8% до 18%' },
      { label: 'Кассовые разрывы', value: '0', desc: 'благодаря прогнозу платёжного календаря' },
      { label: 'Время в операционке', value: '-75%', desc: 'с 60 до 15 часов/неделю' },
      { label: 'Срывы сроков', value: '-87%', desc: 'с 40% до 5%' }
    ],
    roi: 'Инвестиции окупились за 4 месяца, годовой эффект — +7,2 млн ₽ чистой прибыли'
  },
  {
    title: 'Сеть розничных магазинов',
    pain: '8 точек, невозможность контролировать, потери в закупках и кражи, отсутствие единой картины',
    solutions: [
      'Создали единую информационную систему по всем точкам',
      'Автоматизировали учёт и аналитику товарооборота',
      'Внедрили ИИ-систему прогнозирования спроса',
      'Выстроили процессы управления персоналом'
    ],
    results: [
      { label: 'Неликвид', value: '-68%', desc: 'с 22% до 7%' },
      { label: 'Потери и недостачи', value: '-65%', desc: 'снижение' },
      { label: 'Оборот', value: '+28%', desc: 'при тех же затратах на закупку' },
      { label: 'Контроль', value: '100%', desc: 'данные по всем точкам онлайн' }
    ],
    roi: 'Экономия на неликвиде и потерях — 340 тыс. ₽/мес, рост прибыли — +31%'
  },
  {
    title: 'B2B-сервис (логистика и склад)',
    pain: 'Рост с 15 до 45 сотрудников убил управляемость, бизнес превратился в хаос',
    solutions: [
      'Описали и стандартизировали все ключевые процессы',
      'Внедрили систему KPI и мотивации персонала',
      'Автоматизировали операционный учёт и отчётность',
      'ИИ-РОП для контроля качества обслуживания клиентов',
      'Построили управленческую структуру'
    ],
    results: [
      { label: 'Выручка на сотрудника', value: '+42%', desc: 'рост' },
      { label: 'Текучесть персонала', value: '-66%', desc: 'с 35% до 12%' },
      { label: 'NPS клиентов', value: '+109%', desc: 'с 32 до 67' },
      { label: 'Операционка', value: '0%', desc: 'собственник вышел, делегировал функции' }
    ],
    roi: 'Рост EBITDA на 4,8 млн ₽ за год, экономия на подборе персонала — 180 тыс. ₽/мес'
  },
  {
    title: 'E-commerce проект',
    pain: 'Продажи непредсказуемы, высокая стоимость привлечения, низкий повторный возврат',
    solutions: [
      'Выстроили сквозную аналитику от рекламы до LTV',
      'Автоматизировали маркетинг и возврат клиентов через ИИ',
      'Оптимизировали логистику и работу с поставщиками',
      'Внедрили прогнозную модель продаж и закупок'
    ],
    results: [
      { label: 'LTV клиента', value: '+112%', desc: 'с 4 200 ₽ до 8 900 ₽' },
      { label: 'Точность прогноза выручки', value: '91%', desc: '' },
      { label: 'CAC', value: '-38%', desc: 'за счёт повторных продаж' },
      { label: 'Кассовые разрывы', value: '0', desc: 'исчезли' }
    ],
    roi: 'Рост чистой прибыли на 160%, сокращение расходов на маркетинг — 25%'
  }
]

export const CaseStudySection = () => {
  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Результаты клиентов: системный рост в цифрах
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="hover:border-accent transition-all">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{study.title}</h3>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-red-400 mb-2">Боль:</p>
                <p className="text-slate-300 text-sm">{study.pain}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-accent mb-2">Что сделали:</p>
                <ul className="space-y-1">
                  {study.solutions.map((solution, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Результат:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {study.results.map((result, i) => (
                    <div key={i} className="bg-slate-700 rounded p-2">
                      <div className="text-accent font-bold text-lg">{result.value}</div>
                      <div className="text-xs text-slate-300">{result.label}</div>
                      {result.desc && <div className="text-xs text-slate-400 mt-1">{result.desc}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-sm">
                  <span className="font-semibold text-accent">ROI:</span>{' '}
                  <span className="text-slate-300">{study.roi}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">25+</div>
            <div className="text-sm text-slate-300">лет опыта</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">14+</div>
            <div className="text-sm text-slate-300">лет цифровизации</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">92%</div>
            <div className="text-sm text-slate-300">удержание</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">10+</div>
            <div className="text-sm text-slate-300">отраслей</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">35+</div>
            <div className="text-sm text-slate-300">внедрений</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">180%</div>
            <div className="text-sm text-slate-300">средний рост прибыли</div>
          </Card>
        </div>

        <div className="mt-12 bg-slate-800 border border-accent rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Да, мы дороже фрилансеров и точечных подрядчиков.
          </h3>
          <p className="text-slate-300 mb-4">
            Но через полгода разница окупается <span className="font-semibold text-accent">в 3-7 раз</span>:
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>💰 <span className="font-semibold">Вы перестаёте терять деньги</span> на хаосе, неэффективности, воровстве</li>
            <li>📈 <span className="font-semibold">Получаете системный рост</span>, а не локальные улучшения</li>
            <li>⏰ <span className="font-semibold">Экономите своё время</span> (а это самый дорогой ресурс)</li>
            <li>🎯 <span className="font-semibold">Избегаете дорогих ошибок</span> самостоятельных экспериментов</li>
            <li>🚀 <span className="font-semibold">Масштабируетесь без проблем</span>, потому что система готова к росту</li>
          </ul>
          <p className="text-lg font-semibold text-accent text-center">
            Мы продаём не часы работы консультантов, а измеримый рост бизнеса.
          </p>
          <p className="text-center text-slate-300 mt-2">
            Средний ROI наших клиентов: <span className="font-bold text-accent">1 к 5</span> за первый год.
          </p>
        </div>
      </div>
    </section>
  )
}

