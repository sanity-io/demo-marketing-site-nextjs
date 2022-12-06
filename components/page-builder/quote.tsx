import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { m, MotionStyle, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import Container from '../container'
import DebugLabel from '../debug/debug-label'
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
  const { logoRef, logoStyle } = useLogoStyle(index)
  const { quoteRef, quoteStyle } = useQuoteStyle(index)

  if (!person) {
    return null
  }

  return (
    <div className="relative">
      <DebugLabel>quote</DebugLabel>

      <Container
        className={'relative flex flex-col md:flex-row md:items-center ' + ''}
      >
        <DebugGrid columns={5} />

        <m.div className="flex p-4 sm:p-5 md:w-[40%] md:py-6 lg:py-7 xl:py-8"  style={quoteStyle}>
          <div
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800"
            ref={quoteRef}
          >
            <span
              className="font-serif text-4xl"
              style={{ transform: 'translate3d(3%, 20%, 0)' }}
            >
              &rdquo;
            </span>
          </div>

          <div className="ml-3 flex flex-col outline">
            <h2
              className="text-xl font-extrabold leading-tight tracking-tight lg:text-2xl"
            >
              {quote}
            </h2>

            <div className="mt-5">
              <div className="flex items-center">
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

                <div className="ml-3">
                  {person?.name ? (
                    <p className="text-xl font-extrabold">{person.name}</p>
                  ) : null}

                  <p className="text-gray-600 dark:text-gray-400">
                    {person.title}
                    {person?.company?.name ? (
                      <>
                        {' '}
                        at <em>{person.company.name}</em>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        <m.div className="p-2 md:w-[60%]"
               ref={logoRef}
               style={logoStyle}>
          <div
            className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-950"
            style={logoStyle}
          >
            {person?.company?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlForImage(person.company.logo).url()}
                alt={person?.name}
                width={320}
                height={320}
              />
            ) : null}
          </div>
        </m.div>
      </Container>
    </div>
  )
}

function useQuoteStyle(index: number) {
  const quoteRef = useRef(null)
  const even = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'start start'],
  })

  const outputRange = [300, 300, 0].map((v) => v * (even ? -1 : 1))
  const quoteStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 1]),
    translateX: useTransform(scrollYProgress, [0, 0.15, 0.45], outputRange, {
      ease: easeOutQuad,
    }),
  }
  return {
    quoteRef,
    quoteStyle,
  }
}

function useLogoStyle(index: number) {
  const logoRef = useRef(null)
  const even = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ['start end', 'start start'],
  })

  const logoStyle: MotionStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 1]),
    translateX: useTransform(
      scrollYProgress,
      [0, 0.1, 0.4],
      [300, 300, 0].map((v) => v * (even ? 1 : -1), {
        ease: easeOutQuad,
      })
    ),
  }

  return {
    logoRef,
    logoStyle,
  }
}

function easeOutQuad(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}
