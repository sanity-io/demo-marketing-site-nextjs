import {getImageDimensions} from '@sanity/asset-utils'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'
import delve from 'dlv'
import {m, MotionStyle, useScroll, useTransform} from 'framer-motion'
import * as React from 'react'
import {useRef} from 'react'
import {KeyedObject, TypedObject} from 'sanity'

import {urlForImage} from '../../sanity/sanity'
import Container from '../container'
import {DebugGrid} from '../debug/grid'

interface LogoType {
  _id: string
  name?: string
  logo?: {
    asset: SanityImageSource
  }
}
type PageBuilderLogosProps = KeyedObject &
  TypedObject & {
    logos?: LogoType[]
  }

export default function PageBuilderLogos(props: PageBuilderLogosProps) {
  const {logos} = props
  if (!logos?.length) {
    return null
  }

  return (
    <div>
      <Container className="relative w-full py-5 sm:py-6 md:py-7">
        <DebugGrid />

        <div className="mb-4 text-center text-gray-700 dark:text-gray-200 sm:mb-5">
          Trusted by industry leaders
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {logos.map((company, i) => (
            <Logo key={company._id} company={company} />
          ))}
        </div>
      </Container>
    </div>
  )
}

function Logo({company}: {company: LogoType}) {
  const ref = delve(company, 'logo.asset._ref')
  const {ref: containerRef, style} = useStyle()
  if (!ref) {
    return null
  }

  // TODO: adjust width/height based on vertical/landscape logos
  const {width, height} = getImageDimensions(ref)
  return (
    <div ref={containerRef}>
      <m.div style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-auto w-[50px] flex-shrink-0 md:w-[100px]"
          // TODO: Adjust if the file is not an SVG
          src={urlForImage(company.logo).url()}
          alt={company?.name}
          width={width}
          height={height}
        />
      </m.div>
    </div>
  )
}

function useStyle() {
  const ref = useRef(null)

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const inputRange = [0, 0.1]
  const style: MotionStyle = {
    opacity: useTransform(scrollYProgress, inputRange, [0, 1]),
    translateY: useTransform(scrollYProgress, inputRange, [20, 0]),
  }
  return {
    ref,
    style,
  }
}
