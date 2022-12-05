import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../sanity/sanity'
import Container from '../../container'
import Links from '../../links'
import { StyledPortableText } from '../portable-text/StyledPortableText'
import { HeroProps } from '.'

export default function HeroH2WithImage(props: HeroProps) {
  const { title, subtitle, content, links, image } = props

  return (
    <div>
      <Container className="flex items-center gap-8">
        <div className="flex flex-col items-start gap-4 py-5 md:px-5 md:py-8">
          {subtitle ? (
            <p className="text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-2xl">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-7xl">
              {title}
            </h2>
          ) : null}
          {content?.length > 0 ? (
            <div className="text-2xl">
              <StyledPortableText value={content} />
            </div>
          ) : null}
          {links ? <Links links={links} /> : null}
        </div>
        <div className="flex-shrink-0 md:px-5">
          <Image
            src={urlForImage(image).width(496).height(372).url()}
            width={496}
            height={372}
            alt={title ?? ``}
          />
        </div>
      </Container>
    </div>
  )
}
