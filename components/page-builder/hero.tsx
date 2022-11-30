import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'
import { KeyedObject } from 'sanity'

import { Link } from '../../types'
import Button from '../button'
import Container from '../container'

type HeroProps = KeyedObject & {
  _type: 'hero'
  title?: string
  subtitle?: string
  links: (KeyedObject & Link)[]
  image?: SanityImageSource
}

export default function PageBuilderHero(props: HeroProps) {
  const { title, subtitle, links } = props

  // TODO: Adapt layout:
  // 1. If this is the first item in the index, render a <h1>
  // 1.1 If it has an image, align left with image right
  // 1.2 If it has no image, align center
  // 2. If this is not the first item in the index, render a <h2>
  // 2.1 If it has an image, align left with image right
  // 2.2 If it has no image, align center

  return (
    <Container>
      <div className="flex flex-col gap-3 py-10 pr-10 md:py-20 lg:w-1/2 lg:gap-5">
        {title ? (
          <h2 className="text-4xl font-bold leading-none tracking-tighter md:text-5xl lg:text-6xl">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="text-lg text-gray-600 md:w-full md:pr-20 md:text-2xl">
            {subtitle}
          </p>
        ) : null}
        {links && links.length > 0 ? (
          <div className="flex items-center gap-5">
            {links.map((link, linkIndex) => (
              <Button
                key={link._key}
                mode={linkIndex > 0 ? `ghost` : `default`}
                icon
                {...link}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  )
}
