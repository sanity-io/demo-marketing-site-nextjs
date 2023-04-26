import {clsx} from 'clsx'
import {ArrowRight} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {Link as LinkProps} from '../types'

type ButtonMode = 'default' | 'ghost' | 'bleed'
type ButtonProps = LinkProps & {
  mode?: ButtonMode
  icon?: boolean
  locale?: string
  href?: string
  disabled?: boolean
}

const buttonClasses = {
  base: `inline-flex gap-2 items-center border px-3 py-2 leading-none rounded transition-colors duration-200 ease-in-out`,
  default: `border-black bg-black text-white hover:border-magenta-400 hover:bg-magenta-400 hover:text-black dark:bg-white dark:text-black dark:text-black`,
  ghost: `border-gray-200 bg-transparent text-black hover:border-magenta-400 hover:bg-magenta-400 hover:text-black dark:border-gray-800 dark:text-gray-200`,
  bleed: `border-transparent text-gray-700 hover:bg-magenta-400 hover:text-black dark:text-gray-200`,
  disabled: `pointer-events-none opacity-40`,
}

export default function Button(props: ButtonProps) {
  const {
    text,
    url,
    reference,
    mode = `default`,
    icon = false,
    locale,
    href,
    disabled = false,
  } = props

  const classes = React.useMemo(
    () =>
      clsx(
        buttonClasses.base,
        buttonClasses[mode],
        disabled && buttonClasses.disabled
      ),
    [mode, disabled]
  )

  if (href) {
    return (
      <Link className={classes} href={href} locale={locale ?? undefined}>
        <span>{text ?? reference?.title}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </Link>
    )
  }
  if (reference?.slug && (reference?.title || text)) {
    return (
      <Link className={classes} href={reference.slug}>
        <span>{text ?? reference?.title}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </Link>
    )
  } else if (url && text) {
    return (
      <a className={classes} href={url}>
        <span>{text}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </a>
    )
  } else if (text) {
    return (
      <span className={classes}>
        <span>{text}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </span>
    )
  }

  return null
}
