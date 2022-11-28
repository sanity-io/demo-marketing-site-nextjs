import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'
import { KeyedObject } from 'sanity'

import { Link } from '../../types'
import Button from '../button'

type HeroProps = KeyedObject & {
  _type: 'hero'
  title?: string
  subtitle?: string
  links: (KeyedObject & Link)[]
  image?: SanityImageSource
}

export default function PageBuilderHero(props: HeroProps) {
  const { title, subtitle, links } = props

  return (
    <div className="flex flex-col gap-3 pr-10 lg:w-1/2 lg:gap-5">
      {title ? (
        <h2 className="text-4xl font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p className="w-2/3 text-lg text-gray-500 md:w-full md:text-4xl">
          {subtitle}
        </p>
      ) : null}
      {links && links.length > 0 ? (
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Button key={link._key} {...link} />
          ))}
        </div>
      ) : null}
      {/* {JSON.stringify(links)} */}
    </div>
  )
}
