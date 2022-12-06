import React from 'react'

export function BentoTitle({ title }: { title?: string }) {
  // if (!title) {
  //   return null
  // }

  return (
    <h2 className="mt-4 mb-5 text-5xl font-extrabold leading-tight tracking-tight outline md:text-7xl">
      {title}
    </h2>
  )
}
