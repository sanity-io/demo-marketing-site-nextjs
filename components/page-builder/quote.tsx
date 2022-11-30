import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PlayCircle, Quote } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import person from '../../schemas/documents/person'
import Container from '../container'

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
  const { quote, person } = props

  return (
    <Container className="flex flex-col lg:flex-row lg:items-center">
      <div className="flex flex-col gap-5 py-10 lg:w-1/2 lg:flex-row lg:px-10">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gray-200">
          <Quote className="h-5 w-5 flex-shrink-0" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold italic leading-tight tracking-tighter lg:text-3xl">
            {quote}
          </h2>
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
                <p className="text-xl font-bold">{person.name}</p>
              ) : null}
              <p className="text-gray-600">
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
      <div className="my-12 flex-1 flex-shrink-0 lg:w-1/2 lg:py-10">
        <div className="mx-auto flex aspect-video w-full max-w-lg rotate-3 items-center justify-center rounded bg-orange-100">
          {person?.company?.logo ? (
            <Image
              className="flex-shrink-0 rounded bg-gray-200"
              src={urlForImage(person.company.logo)
                .width(256)
                .height(256)
                .dpr(2)
                .auto('format')
                .url()}
              alt={person?.name}
              width={256}
              height={256}
            />
          ) : null}
        </div>
      </div>
    </Container>
  )
}
