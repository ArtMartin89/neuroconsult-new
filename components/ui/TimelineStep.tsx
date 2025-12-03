import React from 'react'
import { cn } from '@/lib/utils'

interface TimelineStepProps {
  step: number
  title: string
  items: string[]
  result?: string
  isLast?: boolean
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  title,
  items,
  result,
  isLast = false,
}) => {
  return (
    <div className="relative flex gap-6">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-accent" />
      )}
      
      {/* Step circle */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <span className="text-sm font-bold text-white">{step}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <ul className="space-y-2 mb-4">
          {items.map((item, index) => (
            <li key={index} className="text-slate-300 flex items-start">
              <span className="text-accent mr-2">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {result && (
          <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-sm font-medium text-accent mb-1">Результат:</p>
            <p className="text-slate-300">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}

