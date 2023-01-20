import React from 'react'

export function BentoTitle({title}: {title?: string}) {
  if (!title) {
    return null
  }

  return (
    <h2 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
      {title}
    </h2>
  )
}
