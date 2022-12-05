import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { m, MotionStyle, useScroll, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import Container from '../container'
import { DebugGrid } from '../debug/grid'

type QuoteProps = KeyedObject &
  TypedObject & {
    index: number
    quote?: string
    person?: {
      name?: string
      title?: string
      picture?: SanityImageSource
      company?: {
        name?: string
        logo?: SanityImageSource
      }
    }
  }

export default function PageBuilderQuote(props: QuoteProps) {
  const { quote, person, index } = props
  const even = index % 2 === 0
  const { ref, logoStyle, quoteMarkStyle, quoteTextStyle, quotePersonStyle } =
    useStyle(index)

  if (!person) {
    return null
  }

  return (
    <div ref={ref}>
      <Container
        className={
          'relative flex lg:items-center ' +
          (even
            ? 'flex-col-reverse lg:flex-row'
            : 'flex-col lg:flex-row-reverse')
        }
      >
        <DebugGrid columns={4} />

        <div className="-mt-5 flex flex-col gap-5 md:mt-0 md:px-5 lg:w-1/2 lg:flex-row">
          <m.div
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800"
            style={quoteMarkStyle}
          >
            <Quote className="h-5 w-5 flex-shrink-0" />
          </m.div>

          <div className="flex flex-col gap-5">
            <m.h2
              className="text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl"
              style={quoteTextStyle}
            >
              {quote}
            </m.h2>

            <div className="h-25">
              <m.div
                className="flex items-center gap-5"
                style={quotePersonStyle}
              >
                {person?.picture ? (
                  <Image
                    className="h-16 w-16 flex-shrink-0 rounded bg-gray-200"
                    src={urlForImage(person.picture)
                      .width(64)
                      .height(64)
                      .dpr(2)
                      .auto('format')
                      .url()}
                    alt={person?.name}
                    width={64}
                    height={64}
                  />
                ) : null}
                <div>
                  {person?.name ? (
                    <p className="text-xl font-extrabold">{person.name}</p>
                  ) : null}
                  <p className="text-gray-600 dark:text-gray-400">
                    {person.title}
                    {person?.company?.name ? (
                      <>
                        <br />
                        <em>{person.company.name}</em>
                      </>
                    ) : null}
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </div>

        <div className="my-12 flex-1 flex-shrink-0 px-5 lg:w-1/2">
          <m.div
            className="mx-auto flex aspect-video w-full max-w-lg items-center justify-center rounded bg-orange-100 dark:bg-magenta-900"
            style={logoStyle}
          >
            {person?.company?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-4/5 flex-shrink-0 rounded bg-gray-200"
                src={urlForImage(person.company.logo).url()}
                alt={person?.name}
                width={512}
                height={512}
              />
            ) : null}
          </m.div>
        </div>
      </Container>
    </div>
  )
}

function useStyle(index: number) {
  const ref = useRef(null)
  const even = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const logoStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 1]),
    translateX: useTransform(
      scrollYProgress,
      [0, 0.1, 0.2],
      [300, 300, 0].map((v) => v * (even ? 1 : -1))
    ),
  }

  const outputRange = [300, 300, 0].map((v) => v * (even ? -1 : 1))
  const quoteMarkStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.15, 0.45], [0, 0, 1]),
    translateX: useTransform(scrollYProgress, [0, 0.15, 0.45], outputRange),
  }

  const quoteTextStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0, 1]),
    translateX: useTransform(scrollYProgress, [0, 0.2, 0.5], outputRange),
  }

  const quotePersonStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.25, 0.55], [0, 0, 1]),
    translateX: useTransform(scrollYProgress, [0, 0.25, 0.55], outputRange),
  }

  return {
    ref,
    logoStyle,
    quoteMarkStyle,
    quoteTextStyle,
    quotePersonStyle,
  }
}
