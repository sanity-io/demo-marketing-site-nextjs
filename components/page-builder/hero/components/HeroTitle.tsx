import React from 'react'

import { useDebug } from '../../../debug/debug-provider'

export function HeroTitle({ title }: { title?: string }) {
  const { grid } = useDebug()

  if (!title) {
    return null
  }

  return (
    <h1
      className={
        // prettier-ignore
        `my-4 text-5xl font-extrabold leading-none tracking-tight ${grid ? `outline` : ``} md:text-5xl lg:text-8xl`
      }
    >
      {title}
    </h1>
  )
}
