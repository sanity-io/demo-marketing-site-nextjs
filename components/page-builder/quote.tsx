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
    <Container className="flex flex-col items-center md:flex-row">
      <div className="flex gap-5 py-10 pr-10 md:w-1/2">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-gray-200">
          <Quote className="h-8 w-8 flex-shrink-0" />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold italic leading-tight tracking-tighter">
            {quote}
          </h2>
          <div className="flex items-center gap-5">
            {person?.picture ? (
              <Image
                className="h-16 w-16 flex-shrink-0 rounded bg-gray-200"
                src={urlForImage(person?.picture).url()}
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
      <div className="my-12 flex aspect-video items-center justify-center bg-gray-100 py-10 md:w-1/2">
        <PlayCircle className="h-24 w-24 opacity-50" />
      </div>
    </Container>
  )
}
