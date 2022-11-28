import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Link as ButtonProps } from '../types'

const buttonClasses = `bg-black inline-flex gap-2 items-center text-white px-5 py-3 leading-none rounded-sm`

export default function Button(props: ButtonProps) {
  const { text, url, reference } = props

  if (reference.slug && (reference.title || text)) {
    return (
      <Link className={buttonClasses} href={reference.slug}>
        <span>{text ?? reference.title}</span>
        <ArrowRight className="w-5" />
      </Link>
    )
  } else if (url && text) {
    return (
      <a className={buttonClasses} href={url}>
        <span>{text}</span>
        <ArrowRight className="w-5" />
      </a>
    )
  } else if (text) {
    return (
      <span className={buttonClasses}>
        <span>{text}</span> <ArrowRight className="w-5" />
      </span>
    )
  }

  return null
}
