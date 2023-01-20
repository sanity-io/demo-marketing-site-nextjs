import React from 'react'

export function HeroSubtitle({subtitle}: {subtitle?: string}) {
  if (!subtitle) {
    return null
  }

  return (
    <p className="text-xl text-magenta-500 dark:text-magenta-400 lg:text-2xl">
      {subtitle}
    </p>
  )
}
