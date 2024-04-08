import clsx from 'clsx'
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
    <p
      className={clsx(
        `text-xl text-magenta-500 lg:text-2xl dark:text-magenta-400`,
        className
      )}
    >
      {subtitle}
    </p>
  )
}
