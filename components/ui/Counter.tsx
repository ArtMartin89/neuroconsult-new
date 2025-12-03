'use client'

import { useEffect, useState, useRef } from 'react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = counterRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={counterRef} className={className}>
      <span className="text-4xl md:text-5xl font-bold text-accent">
        {prefix}{count}{suffix}
      </span>
    </div>
  )
}

