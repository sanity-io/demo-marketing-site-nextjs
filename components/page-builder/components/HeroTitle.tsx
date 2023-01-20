import React from 'react'

export function HeroTitle({title}: {title?: string}) {
  if (!title) {
    return null
  }

  return (
    <h1 className="text-6xl font-extrabold leading-none tracking-tight lg:text-8xl">
      {title}
    </h1>
  )
}
