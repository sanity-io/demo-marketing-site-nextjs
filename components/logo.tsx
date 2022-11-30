import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

/* TODO: use href from domainLocale */
export default function Logo(props: PropsWithChildren) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 text-lg font-bold leading-tight tracking-tight md:text-xl md:tracking-tighter"
    >
      <div className="h-4 w-4 rounded-full bg-theme" />
      {props.children}
    </Link>
  )
}
