import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'NeuroConsult: Системный рост бизнеса',
  description: 'Построим работающую систему управления с ИИ-контролем — чтобы ваш бизнес приносил стабильную прибыль, пока вы занимаетесь стратегией, а не тушите пожары',
  keywords: 'системный консалтинг, AI автоматизация, управление бизнесом, системный рост',
  openGraph: {
    title: 'NeuroConsult: Системный рост бизнеса',
    description: 'Системный консалтинг + AI-автоматизация = Измеримый рост по всем направлениям уже через 3 месяца',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroConsult: Системный рост бизнеса',
    description: 'Системный консалтинг + AI-автоматизация = Измеримый рост по всем направлениям уже через 3 месяца',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* Яндекс.Метрика */}
        {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && (
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
        )}
      </body>
    </html>
  )
}

