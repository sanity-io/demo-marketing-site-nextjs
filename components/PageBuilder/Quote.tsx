import {SanityImageSource} from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import React from 'react'
import {KeyedObject, TypedObject} from 'sanity'

import {urlForImage} from '../../sanity/sanity'
import Container from '../Fix/Container'

type QuoteProps = KeyedObject &
  TypedObject & {
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
  const {quote, person} = props

  if (!person) {
    return null
  }

  return (
    <div>
      <Container className="relative flex max-w-4xl flex-col-reverse p-4 lg:flex-row lg:items-center">
        <div className="mt-5 mb-5 flex flex-row gap-5 md:px-5">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800">
            <span
              className="font-serif text-5xl"
              style={{transform: 'translate3d(3%, 20%, 0)'}}
            >
              &rdquo;
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl">
              {quote}
            </h2>

            <div className="h-25">
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
