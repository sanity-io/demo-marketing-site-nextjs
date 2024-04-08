import React from 'react'

export function HeroSubtitle({subtitle}: {subtitle?: string}) {
  if (!subtitle) {
    return null
  }

  return (
    <p className="text-xl text-magenta-500 lg:text-2xl dark:text-magenta-400">
      {subtitle}
    </p>
  )
}
