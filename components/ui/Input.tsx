import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({
  className,
  error,
  label,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 bg-secondary border border-slate-700 rounded-lg',
          'text-foreground placeholder-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

