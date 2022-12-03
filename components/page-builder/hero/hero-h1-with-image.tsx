import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../sanity/sanity'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { AnimateScrollOut } from '../../animation/AnimateScrollOut'
import { outFade, outright, outSofTop } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import Links from '../../links'
import { HeroProps } from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const { title, subtitle, summary, image, links } = props

  return (
    <Container className="relative">
      <AnimateScrollOut params={outFade} startProgress={0.3} stopProgress={0.8}>
        <DebugGrid columns={5} />

        <div className="flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 md:flex-row md:items-center md:py-5">
          <div className="relative flex w-full flex-col gap-4 py-5 sm:py-6 md:w-3/5 md:py-7 lg:py-8 ">
            {subtitle ? (
              <ScrollProgressContainer scrollWindowSize={0.2}>
                <AnimateScrollIn
                  params={outSofTop}
                  startProgress={0.7}
                  stopProgress={0.9}
                >
                  <p className="text-base text-white text-magenta-500 dark:text-magenta-400 md:static md:-mt-0 md:w-full md:translate-y-0 md:text-2xl">
                    {subtitle}
                  </p>
                </AnimateScrollIn>
              </ScrollProgressContainer>
            ) : null}

            {title ? (
              <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
                {title}
              </h1>
            ) : null}

            {summary?.length > 0 ? (
              <div className="max-w-xl text-xl text-gray-700 dark:text-gray-200 md:text-2xl">
                <PortableText value={summary} />
              </div>
            ) : null}

            {links ? <Links links={links} /> : null}
          </div>

          <div className="flex w-full items-stretch justify-items-stretch self-stretch md:w-2/5 md:py-7 lg:py-8 ">
            <Image
              src={urlForImage(image).width(496).height(372).url()}
              width={496}
              height={372}
              alt={title ?? ``}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </AnimateScrollOut>
    </Container>
  )
}
