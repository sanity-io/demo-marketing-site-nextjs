import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'

import { urlForImage } from '../../../sanity/sanity'
import Container from '../../container'
import DebugLabel from '../../debug/debug-label'
import { DebugGrid } from '../../debug/grid'
import { ElementScrollStyle } from '../../framer-motion/useElementScroll'
import Links from '../../links'
import { HeroProps } from '.'
import { HeroSubtitle } from './components/HeroSubtitle'
import { HeroSummary } from './components/HeroSummary'
import { HeroTitle } from './components/HeroTitle'

export default function HeroH1WithImage(props: HeroProps) {
  const { title, subtitle, summary, image, links } = props
  const { ref, style } = useStyle()
  return (
    <div className="relative" style={{ minHeight: '90vh' }}>
      <DebugLabel>hero-h1-with-image</DebugLabel>

      <Container
        className="relative flex items-center justify-center"
        style={{ minHeight: '90vh' }}
      >
        <DebugGrid columns={5} />

        <div>
          <m.div
            ref={ref}
            style={style}
            className="flex flex-col-reverse items-stretch justify-items-stretch md:flex-row md:items-center"
          >
            <div className="text-container relative w-full p-4 sm:p-5 md:w-[60%] md:py-6 lg:py-7">
              <HeroSubtitle subtitle={subtitle} />
              <HeroTitle title={title} />
              <HeroSummary summary={summary} />
              <Links links={links} />
            </div>

            <div className="flex w-full items-stretch justify-items-stretch self-stretch p-2 md:w-[40%]">
              <Image
                src={urlForImage(image)
                  .width(496 * 2)
                  .height(372 * 2)
                  .url()}
                width={496}
                height={372}
                alt={title ?? ``}
                className="h-full w-full rounded object-cover"
              />
            </div>
          </m.div>
        </div>
      </Container>
    </div>
  )
}

function useStyle(): ElementScrollStyle {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end', '0.8 start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  return {
    ref,
    style: {
      opacity,
    },
  }
}
