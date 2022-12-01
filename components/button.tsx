import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Link as LinkProps } from '../types'

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
  default: `bg-black text-white border-black hover:bg-theme hover:text-black hover:border-theme`,
  ghost: `bg-transparent text-black dark:text-gray-200 border-black dark:border-gray-200 hover:bg-theme hover:text-black hover:border-theme`,
  bleed: `border-transparent text-gray-600 dark:text-gray-200 hover:text-black hover:bg-theme`,
  disabled: `opacity-50 pointer-events-none`,
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
  const classNames = [
    buttonClasses.base,
    buttonClasses[mode],
    ...(disabled ? [buttonClasses.disabled] : []),
  ]
    .filter(Boolean)
    .join(` `)

  if (locale && href) {
    return (
      <Link className={classNames} href={href}>
        <span>{text ?? reference?.title}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </Link>
    )
  }
  if (reference?.slug && (reference?.title || text)) {
    return (
      <Link className={classNames} href={reference.slug}>
        <span>{text ?? reference?.title}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </Link>
    )
  } else if (url && text) {
    return (
      <a className={classNames} href={url}>
        <span>{text}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </a>
    )
  } else if (text) {
    return (
      <span className={classNames}>
        <span>{text}</span>
        {icon ? <ArrowRight className="w-5" /> : null}
      </span>
    )
  }

  return null
}
