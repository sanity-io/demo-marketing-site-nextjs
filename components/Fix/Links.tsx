import clsx from 'clsx'
import React from 'react'
import {KeyedObject} from 'sanity'

import {Link} from '../../types'
import Button from './Button'

type LinksProps = {
  links: (KeyedObject & Link)[]
  className?: string
}

export default function Links(props: LinksProps) {
  const {links, className} = props

  if (!links?.length) return null

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {links.map((link, linkIndex) => (
        <Button
          key={link._key}
          mode={linkIndex > 0 ? `ghost` : `default`}
          icon
          {...link}
        />
      ))}
    </div>
  )
}
