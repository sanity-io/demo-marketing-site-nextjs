import {m, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import React, {useRef} from 'react'

import {urlForImage} from '../../../sanity/sanity'
import Container from '../../container'
import {DebugGrid} from '../../debug/grid'
import {ElementScrollStyle} from '../../framer-motion/useElementScroll'
import Links from '../../links'
import {HeroSubtitle} from '../components/HeroSubtitle'
import {HeroSummary} from '../components/HeroSummary'
import {HeroTitle} from '../components/HeroTitle'
import {HeroProps} from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const {title, subtitle, summary, image, links} = props
  const {ref, style} = useStyle()
  return (
    <div>
      <Container className="relative">
        <DebugGrid columns={5} />

        <m.div
          ref={ref}
          style={style}
          className="flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 md:flex-row md:items-center md:py-5"
        >
          <div className="relative flex w-full flex-col gap-4 py-5 sm:py-6 md:w-3/5 md:py-7 lg:py-8 ">
            <HeroSubtitle subtitle={subtitle} />
            <HeroTitle title={title} />
            <HeroSummary summary={summary} />
            <Links links={links} />
          </div>

          <div className="flex w-full items-stretch justify-items-stretch self-stretch md:w-2/5 md:py-7 lg:py-8 ">
            <Image
              src={urlForImage(image).width(496).height(372).url()}
              width={496}
              height={372}
              alt={title ?? ``}
              className="h-full w-full rounded object-cover"
            />
          </div>
        </m.div>
      </Container>
    </div>
  )
}

function useStyle(): ElementScrollStyle {
  const ref = useRef(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['end end', '0.8 start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  return {
    ref,
    style: {
      opacity,
    },
  }
}
