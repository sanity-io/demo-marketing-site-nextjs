import * as React from 'react'

export default function PostTitle({children}) {
  return (
    <h1 className="mb-12 text-center text-6xl font-extrabold leading-tight tracking-tight md:text-left md:text-7xl md:leading-none lg:text-8xl">
      {children}
    </h1>
  )
}
