import React from 'react'

export function BentoTitle({ title }: { title?: string }) {
  if (!title) {
    return null
  }

  return (
    <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
      {title}
    </h2>
  )
}
