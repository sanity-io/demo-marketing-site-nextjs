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
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between pt-4 md:py-5 md:gap-0">
        <div className="flex w-full md:w-3/4 flex-col gap-4 px-4 md:px-5 py-6 md:py-8 relative">
          {subtitle ? (
            <p className="block text-base md:text-theme md:bg-transparent md:p-0 md:static md:w-full md:text-2xl absolute md:-mt-0 md:translate-y-0 bg-theme text-white p-2 px-4 right-4 rounded-full -translate-y-1/2 -mt-6">
              {subtitle}
            </p>
          ) : null}
          {title ? (
            <h1 className="text-5xl font-bold leading-none tracking-tighter md:text-5xl lg:text-8xl">
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
            className="rounded-lg object-cover w-full h-auto aspect-video"
          />
        </div>
      </div>
    </Container>
  )
}
