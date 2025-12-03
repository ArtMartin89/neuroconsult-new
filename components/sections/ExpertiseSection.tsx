import { Counter } from '@/components/ui/Counter'
import { Card } from '@/components/ui/Card'
import { Target, BarChart3, Settings, Bot, Users, DollarSign } from 'lucide-react'

const teamMembers = [
  { icon: Target, title: 'Стратеги', desc: 'понимают логику бизнеса в вашей отрасли, видят картину целиком' },
  { icon: BarChart3, title: 'Бизнес-аналитики', desc: 'найдут утечки денег и неэффективность в процессах' },
  { icon: Settings, title: 'Специалисты по автоматизации', desc: 'выстроят прозрачную систему управления' },
  { icon: Bot, title: 'AI-архитекторы', desc: 'внедрят умные решения, а не модные игрушки' },
  { icon: Users, title: 'HR и оргконсультанты', desc: 'помогут выстроить команду и культуру' },
  { icon: DollarSign, title: 'Финансовые эксперты', desc: 'наладят управленческий учёт и контроль денег' }
]

export const ExpertiseSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          С кем вы будете работать: не теоретики, а практики системного роста
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Counter end={25} suffix="+" />
            <p className="text-slate-300 mt-2 text-sm">лет суммарного опыта команды</p>
          </div>
          <div className="text-center">
            <Counter end={14} suffix="+" />
            <p className="text-slate-300 mt-2 text-sm">лет практики цифровизации</p>
          </div>
          <div className="text-center">
            <Counter end={92} suffix="%" />
            <p className="text-slate-300 mt-2 text-sm">клиентов остаются с нами</p>
          </div>
          <div className="text-center">
            <Counter end={10} suffix="+" />
            <p className="text-slate-300 mt-2 text-sm">отраслей опыта</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 md:p-8 mb-8">
            <p className="text-lg text-slate-300 mb-4">
              <span className="font-semibold text-foreground">С 2003 года</span> в бизнесе — мы прошли все стадии роста изнутри
            </p>
            <p className="text-slate-300">
              <span className="font-semibold text-foreground">Мы не IT-шники, которые не понимают бизнес.</span><br />
              И не консультанты-теоретики из больших компаний.
            </p>
            <p className="text-slate-300 mt-4">
              Мы — предприниматели и управленцы с реальным опытом построения систем. Мы внедрили ИИ и автоматизацию в свои бизнесы, прошли через все грабли — и теперь помогаем другим избежать наших ошибок.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Команда:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => {
              const Icon = member.icon
              return (
                <Card key={index} hover>
                  <div className="flex gap-4">
                    <Icon className="w-8 h-8 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">{member.title}</h4>
                      <p className="text-sm text-slate-300">{member.desc}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
          <p className="text-center text-slate-300 mt-6">
            Все с высоким эмоциональным интеллектом — мы не просто делаем проект, мы становимся частью вашей команды.
          </p>
        </div>

        <div className="bg-slate-800 border border-accent rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Имя Основателя, со-основатель NeuroConsult
            </h3>
          </div>
          <div className="text-slate-300 space-y-3">
            <p>
              15+ лет в управлении и системном развитии бизнеса. Построил и продал 2 компании, пройдя путь от 3 человек до 150+. Управлял финансами, продажами, операциями — знаю боли собственника изнутри.
            </p>
            <p>
              Последние 5 лет внедряю ИИ и автоматизацию — сначала в свои бизнесы, затем для клиентов.
            </p>
            <p className="italic text-accent mt-4">
              Моя задача — чтобы вы спокойно спали, зная, что бизнес работает как система, а не держится на вас.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

