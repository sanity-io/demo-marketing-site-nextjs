import React from 'react'

export function BentoSubtitle({
  subtitle,
  className,
}: {
  subtitle?: string
  className?: string
}) {
  if (!subtitle) {
    return null
  }

  return (
    <div className={className ?? 'py-2'}>
      <div className="max-w-xl rounded-full text-2xl text-magenta-500 dark:text-magenta-400">
        {subtitle}
      </div>
    </div>
  )
}
