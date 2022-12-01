import React from 'react'
import { KeyedObject } from 'sanity'

import { Link } from '../types'
import Button from './button'

type LinksProps = {
  links: (KeyedObject & Link)[]
}

export default function Links(props: LinksProps) {
  const { links } = props

  if (!links?.length) return null

  return (
    <div className="flex items-center gap-2">
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
