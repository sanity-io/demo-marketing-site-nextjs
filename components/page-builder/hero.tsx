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
    <div className="flex flex-col gap-3 lg:w-1/2 pr-10 lg:gap-5">
      {title ? (
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-none">
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p className="text-lg md:text-4xl text-gray-500 w-2/3 md:w-full">
          {subtitle}
        </p>
      ) : null}
      {links && links.length > 0 ? (
        <div className='flex items-center gap-5'>
          {links.map((link) => (
            <Button key={link._key} {...link} />
          ))}
        </div>
      ) : null}
      {/* {JSON.stringify(links)} */}
    </div>
  )
}
