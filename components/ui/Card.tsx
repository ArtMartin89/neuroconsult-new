import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-slate-800 border border-slate-700 rounded-lg p-6',
        hover && 'transition-all duration-300 hover:border-accent hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

