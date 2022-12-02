import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import { AnimateScrollIn } from '../animation/AnimateScrollIn'
import {
  inFade,
  inHardBottom,
  inHardTop,
  inLeft,
  inRight,
  inSoftBottom,
} from '../animation/scrollAnimations'
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

  if (!person) {
    return null
  }

  const start = 0.55
  const end = 0.8
  console.log(person)
  return (
    <div className="border-t border-gray-200 dark:border-gray-800">
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
          <AnimateScrollIn
            params={even ? inLeft : inRight}
            startProgress={start + 0.2}
            stopProgress={end + 0.2}
          >
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800">
              <Quote className="h-5 w-5 flex-shrink-0" />
            </div>
          </AnimateScrollIn>

          <div className="flex flex-col gap-5">
            <AnimateScrollIn
              params={even ? inLeft : inRight}
              startProgress={start + 0.16}
              stopProgress={end + 0.16}
            >
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl">
                {quote}
              </h2>
            </AnimateScrollIn>

            <div className="h-25 overflow-hidden">
              <AnimateScrollIn
                params={inHardBottom}
                startProgress={0.85}
                stopProgress={0.95}
              >
                <div className="flex items-center gap-5">
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
                </div>
              </AnimateScrollIn>
            </div>
          </div>
        </div>

        <div className="my-12 flex-1 flex-shrink-0 overflow-hidden px-5 lg:w-1/2">
          <AnimateScrollIn
            params={even ? inHardTop : inRight}
            startProgress={0.45}
            stopProgress={0.7}
          >
            <div className="mx-auto flex aspect-video w-full max-w-lg items-center justify-center rounded bg-orange-100 dark:bg-magenta-900">
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
            </div>
          </AnimateScrollIn>
        </div>
      </Container>
    </div>
  )
}
