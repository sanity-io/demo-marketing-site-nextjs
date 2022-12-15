import React from 'react'

export function HeroTitle({title}: {title?: string}) {
  if (!title) {
    return null
  }

  return (
    <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
      {title}
    </h1>
  )
}
