# Инструкция по деплою на Vercel

## Подготовка к деплою

1. **Убедитесь, что проект собирается локально:**
   ```bash
   npm run build
   ```

2. **Создайте репозиторий на GitHub** (если ещё не создан)

3. **Закоммитьте и запушьте код:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Деплой через Vercel Dashboard

1. Перейдите на [vercel.com](https://vercel.com) и войдите в аккаунт
2. Нажмите "Add New Project"
3. Импортируйте ваш GitHub репозиторий
4. Vercel автоматически определит настройки Next.js
5. Добавьте переменные окружения в разделе "Environment Variables":

   - `NEXT_PUBLIC_GA_ID` (опционально)
   - `NEXT_PUBLIC_YANDEX_METRIKA_ID` (опционально)
   - `RECAPTCHA_SITE_KEY` (опционально)
   - `RECAPTCHA_SECRET_KEY` (опционально)
   - `CRM_WEBHOOK_URL` (обязательно, если нужна отправка в CRM)

6. Нажмите "Deploy"

## Деплой через Vercel CLI

1. Установите Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Войдите в аккаунт:
   ```bash
   vercel login
   ```

3. Задеплойте проект:
   ```bash
   vercel
   ```

4. Для продакшн деплоя:
   ```bash
   vercel --prod
   ```

## Настройка домена

1. В настройках проекта Vercel перейдите в "Domains"
2. Добавьте ваш домен (например, neuroconsult.by)
3. Следуйте инструкциям по настройке DNS записей

## Проверка после деплоя

1. Проверьте, что сайт открывается
2. Проверьте форму обратной связи
3. Проверьте аналитику (если настроена)
4. Проверьте метатеги через [Open Graph Debugger](https://www.opengraph.xyz/)

## Обновление сайта

После каждого push в main ветку Vercel автоматически создаст новый деплой. Вы можете настроить автоматический деплой в продакшн или делать это вручную через Dashboard.

