import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../sanity/sanity'
import Container from '../../container'
import Links from '../../links'
import { HeroProps } from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const { title, subtitle, summary, image, links } = props

  return (
    <Container>
      <div className="flex flex-col-reverse items-start justify-between pt-4 md:flex-row md:items-center md:gap-0 md:py-5">
        <div className="relative flex w-full flex-col gap-4 px-4 py-6 md:w-3/4 md:px-5 md:py-8">
          {subtitle ? (
            <p className="absolute right-4 -mt-6 block -translate-y-1/2 rounded-full bg-theme p-2 px-4 text-base text-white md:static md:-mt-0 md:w-full md:translate-y-0 md:bg-transparent md:p-0 md:text-2xl md:text-theme">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
              {title}
            </h1>
          ) : null}
          {summary?.length > 0 ? (
            <div className="max-w-xl text-xl md:text-2xl">
              <PortableText value={summary} />
            </div>
          ) : null}
          {links ? <Links links={links} /> : null}
        </div>
        <div className="w-full md:w-1/4">
          <Image
            src={urlForImage(image).width(496).height(372).url()}
            width={496}
            height={372}
            alt={title ?? ``}
            className="aspect-video h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </Container>
  )
}
