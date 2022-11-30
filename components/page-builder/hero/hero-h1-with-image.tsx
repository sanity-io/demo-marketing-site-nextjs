import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../sanity/sanity'
import Container from '../../container'
import Links from '../../links'
import { HeroProps } from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const { title, subtitle, content, image, links } = props

  return (
    <Container>
      <div className="flex items-center justify-between py-5 md:py-8">
        <div className="flex w-3/4 flex-col gap-4 md:px-5">
          {subtitle ? (
            <p className="text-lg text-theme md:w-full md:text-2xl">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h1 className="text-4xl font-bold leading-none tracking-tighter md:text-5xl lg:text-8xl">
              {title}
            </h1>
          ) : null}
          {content?.length > 0 ? (
            <div className="max-w-xl text-2xl">
              <PortableText value={content} />
            </div>
          ) : null}
          {links ? <Links links={links} /> : null}
        </div>
        <div className="w-1/4">
          <Image
            src={urlForImage(image).width(496).height(372).url()}
            width={496}
            height={372}
            alt={title ?? ``}
          />
        </div>
      </div>
    </Container>
  )
}
