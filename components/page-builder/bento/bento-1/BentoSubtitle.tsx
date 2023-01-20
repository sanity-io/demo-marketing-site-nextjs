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
      <p className="text-xl text-magenta-500 dark:text-magenta-400 lg:text-2xl">
        {subtitle}
      </p>
    </div>
  )
}
