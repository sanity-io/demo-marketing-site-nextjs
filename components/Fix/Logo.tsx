import Link from 'next/link'
import React, {PropsWithChildren} from 'react'

/* TODO: use href from domainLocale */
export default function Logo(props: PropsWithChildren) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 text-lg font-extrabold leading-tight tracking-tight md:text-xl"
    >
      <div className="dark-magenta-400 h-4 w-4 rounded-full bg-magenta-400" />
      {props.children}
    </Link>
  )
}
