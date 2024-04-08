import * as React from 'react'

export default function Title({title}) {
  return (
    <h2 className="mb-20 mt-8 text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
      {title}
    </h2>
  )
}
