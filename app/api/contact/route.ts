import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  phone: string
  email: string
  business: string
  pain: string
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 12
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
    return true
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score > 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData & { recaptchaToken?: string } = await request.json()

    // Validation
    if (!body.name || !body.phone || !body.email || !body.business || !body.pain) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Некорректный формат email' },
        { status: 400 }
      )
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { error: 'Некорректный формат телефона' },
        { status: 400 }
      )
    }

    // reCAPTCHA verification
    if (body.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(body.recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'Ошибка проверки reCAPTCHA' },
          { status: 400 }
        )
      }
    }

    // Send to CRM webhook
    const webhookUrl = process.env.CRM_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: body.name,
            phone: body.phone,
            email: body.email,
            business: body.business,
            pain: body.pain,
            source: 'neuroconsult-landing',
            timestamp: new Date().toISOString(),
          }),
        })

        if (!webhookResponse.ok) {
          console.error('Webhook error:', webhookResponse.status, webhookResponse.statusText)
          return NextResponse.json(
            { error: 'Ошибка отправки данных в CRM' },
            { status: 500 }
          )
        }
      } catch (error) {
        console.error('Webhook request error:', error)
        return NextResponse.json(
          { error: 'Ошибка подключения к CRM' },
          { status: 500 }
        )
      }
    } else {
      console.log('CRM_WEBHOOK_URL not set, skipping webhook call')
      console.log('Form data:', body)
    }

    return NextResponse.json(
      { message: 'Заявка успешно отправлена' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

