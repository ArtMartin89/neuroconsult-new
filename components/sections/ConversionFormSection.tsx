'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import InputMask from 'react-input-mask'
import { Card } from '@/components/ui/Card'
import { AlertCircle, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  business: string
  pain: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  business?: string
  pain?: string
}

export const ConversionFormSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    business: '',
    pain: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 12 // +375 (XX) XXX-XX-XX = 12 digits
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Обязательное поле'
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.business.trim()) {
      newErrors.business = 'Обязательное поле'
    }

    if (!formData.pain.trim()) {
      newErrors.pain = 'Обязательное поле'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          phone: '',
          email: '',
          business: '',
          pain: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = Object.values(formData).every(field => field.trim() !== '') && 
                      validateEmail(formData.email) && 
                      validatePhone(formData.phone)

  return (
    <section id="conversion-form" className="py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Хватит держать бизнес на себе. Получите план системной трансформации
        </h2>

        <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
          Не рискуйте бюджетом, внедряя ИИ вслепую, или годами топчась на месте.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Мы предлагаем бесплатную стратегическую сессию (90 минут):
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span>Комплексный аудит вашего бизнеса по 5 направлениям</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span>Карта потерь — где вы теряете деньги прямо сейчас</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span>3-5 quick wins — что можно исправить быстро и дёшево</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span>Дорожная карта системной трансформации с приоритетами</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span>Прогноз ROI — сколько вы заработаете и за какой срок</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-slate-800 border border-accent rounded-lg">
              <p className="text-sm font-semibold text-accent mb-2">⚠️ Ограничение:</p>
              <p className="text-sm text-slate-300">
                Берём максимум 5 новых проектов в месяц. Чтобы обеспечить качество погружения и внимание каждому клиенту.
              </p>
            </div>

            <div className="mt-6 p-4 bg-slate-800 border border-red-500 rounded-lg">
              <p className="text-sm font-semibold text-red-400 mb-2">Кому точно НЕ подходит:</p>
              <p className="text-sm text-slate-300">
                Мы НЕ подходим, если вы ищете дешёвого исполнителя разовых задач, не готовы менять процессы и вкладываться в систему, хотите «волшебную таблетку» без работы над бизнесом, ожидаете результата за неделю.
              </p>
            </div>
          </div>

          <Card className="bg-slate-800">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                placeholder="Иван Иванов"
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Телефон
                </label>
                <InputMask
                  mask="+375 (99) 999-99-99"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  maskChar={null}
                >
                  {/* @ts-ignore */}
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      className={`w-full px-4 py-3 bg-secondary border border-slate-700 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="+375 (XX) XXX-XX-XX"
                    />
                  )}
                </InputMask>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                placeholder="ivan@example.com"
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Какой у вас бизнес
                </label>
                <textarea
                  className={`w-full px-4 py-3 bg-secondary border border-slate-700 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 min-h-[100px] ${
                    errors.business ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  placeholder="Отрасль, оборот, количество сотрудников"
                  required
                />
                {errors.business && (
                  <p className="mt-1 text-sm text-red-500">{errors.business}</p>
                )}
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Главная боль прямо сейчас
                </label>
                <textarea
                  className={`w-full px-4 py-3 bg-secondary border border-slate-700 rounded-lg text-foreground placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 min-h-[100px] ${
                    errors.pain ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  value={formData.pain}
                  onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                  placeholder="Опишите основную проблему"
                  required
                />
                {errors.pain && (
                  <p className="mt-1 text-sm text-red-500">{errors.pain}</p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/30 border border-green-500 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-semibold">Заявка отправлена!</p>
                    <p className="text-sm text-green-300 mt-1">
                      Мы позвоним вам в течение 2 часов (в рабочее время)
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold">Ошибка отправки</p>
                    <p className="text-sm text-red-300 mt-1">
                      Попробуйте ещё раз или свяжитесь с нами напрямую
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Получить бесплатную стратегическую сессию'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700 space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Оставьте заявку — мы позвоним в течение 2 часов (в рабочее время)
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Сессию проведёт лично старший бизнес-консультант, а не менеджер по продажам
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Если поймём, что не подходим — честно скажем и порекомендуем альтернативы
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold mb-4 text-foreground">Или свяжитесь напрямую:</p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-300">
            <a href="https://t.me/neuroconsult" className="flex items-center gap-2 hover:text-accent transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span>Telegram: @neuroconsult</span>
            </a>
            <a href="mailto:ask@neuroconsult.by" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
              <span>Email: ask@neuroconsult.by</span>
            </a>
            <a href="tel:+375447761504" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-5 h-5" />
              <span>+375 (44) 776-15-04</span>
            </a>
          </div>
          <p className="text-sm text-slate-400 mt-4">График работы: Пн-Пт, 10:00-19:00</p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-300 italic">
            P.S. Каждый день хаоса — это потерянная прибыль и упущенные возможности. Системный бизнес начинается с одного решения. Примите его сегодня.
          </p>
        </div>
      </div>
    </section>
  )
}

