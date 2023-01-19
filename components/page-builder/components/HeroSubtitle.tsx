import React from 'react'

export function HeroSubtitle({subtitle}: {subtitle?: string}) {
  if (!subtitle) {
    return null
  }
  return (
    <div className="text-base text-magenta-500 dark:text-magenta-400 md:static md:-mt-0 md:w-full md:translate-y-0 md:text-2xl">
      {subtitle}
    </div>
  )
}
