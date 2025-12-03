# NeuroConsult Landing Page

Высококонверсионный лендинг для системного консалтинга и ИИ-автоматизации бизнеса.

## Технологии

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI** (Accordion)
- **Framer Motion** (анимации)
- **Lucide React** (иконки)
- **React Input Mask** (маска телефона)

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
cp .env.example .env.local
```

Необходимые переменные:
- `NEXT_PUBLIC_GA_ID` - ID Google Analytics 4 (опционально)
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` - ID Яндекс.Метрики (опционально)
- `RECAPTCHA_SITE_KEY` - Публичный ключ reCAPTCHA v3 (опционально)
- `RECAPTCHA_SECRET_KEY` - Секретный ключ reCAPTCHA v3 (опционально)
- `CRM_WEBHOOK_URL` - URL вебхука для отправки заявок в CRM

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена

```bash
npm run build
npm start
```

## Деплой на Vercel

### Автоматический деплой через GitHub

1. Создайте репозиторий на GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения в настройках проекта Vercel
4. Деплой произойдёт автоматически при каждом push в main ветку

### Ручной деплой через Vercel CLI

```bash
npm i -g vercel
vercel
```

Следуйте инструкциям в терминале.

### Переменные окружения в Vercel

В настройках проекта Vercel добавьте все переменные из `.env.example`:

1. Перейдите в Settings → Environment Variables
2. Добавьте каждую переменную
3. Выберите окружения (Production, Preview, Development)

## Структура проекта

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API endpoint для формы
│   ├── globals.css               # Глобальные стили
│   ├── layout.tsx                # Корневой layout с метаданными
│   └── page.tsx                  # Главная страница
├── components/
│   ├── sections/                 # Секции лендинга
│   │   ├── HeroBlock.tsx
│   │   ├── PainPointsSection.tsx
│   │   ├── CVPSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── CaseStudySection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ConversionFormSection.tsx
│   └── ui/                       # Переиспользуемые UI компоненты
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Accordion.tsx
│       ├── Counter.tsx
│       └── TimelineStep.tsx
├── lib/
│   └── utils.ts                  # Утилиты (cn функция)
└── public/                       # Статические файлы
```

## Особенности

- ✅ Полностью адаптивный дизайн (Mobile-First)
- ✅ Dark Mode дизайн с высокой контрастностью
- ✅ SEO оптимизация (метатеги, Open Graph, Twitter Cards)
- ✅ Интеграция аналитики (GA4, Яндекс.Метрика)
- ✅ Валидация формы на клиенте и сервере
- ✅ Защита от спама (reCAPTCHA v3)
- ✅ Анимации при скролле (Intersection Observer)
- ✅ Оптимизация производительности (Core Web Vitals)

## API Endpoint

### POST /api/contact

Отправка формы обратной связи.

**Тело запроса:**
```json
{
  "name": "Иван Иванов",
  "phone": "+375 (29) 123-45-67",
  "email": "ivan@example.com",
  "business": "Производство, 50 млн оборот, 30 сотрудников",
  "pain": "Хаос в процессах, нет контроля"
}
```

**Ответы:**
- `200 OK` - Заявка успешно отправлена
- `400 Bad Request` - Ошибка валидации
- `500 Internal Server Error` - Ошибка сервера или CRM

## Лицензия

Проприетарная лицензия. Все права защищены.

