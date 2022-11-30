import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Star } from 'lucide-react'
import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import Container from '../container'

type PromotionProps = KeyedObject &
  TypedObject & {
    promotions: {
      _key: string
      _type: 'promotion'
      title?: string
      subtitle?: string
      content?: string
      image?: SanityImageSource
    }[]
  }

export default function PageBuilderPromotion(props: PromotionProps) {
  const { promotions } = props

  if (!promotions?.length) {
    return null
  } else if (promotions.length === 1) {
    const [promotion] = promotions

    return (
      <div className="border-t border-b border-gray-200">
        <Container>
          <div className="flex flex-col gap-5 py-24 md:items-center md:justify-center">
            {promotion.subtitle ? (
              <p className="max-w-xl rounded-full bg-theme px-5 py-2 text-2xl text-black md:text-center">
                {promotion.subtitle}
              </p>
            ) : null}
            <h2 className="text-5xl font-bold leading-tight tracking-tighter md:text-center md:text-7xl">
              {promotion.title}
            </h2>
            <p className="max-w-xl text-2xl text-gray-600 md:text-center">
              {promotion.content}
            </p>
          </div>
        </Container>
      </div>
    )
  } else if (promotions.length === 2 || promotions.length === 4) {
    return (
      <div className="border-t border-b border-gray-200">
        <Container className="flex flex-col md:flex-row md:flex-wrap">
          {promotions.map((promotion, promotionIndex) => (
            <div
              key={promotion._key}
              className={`flex gap-5 py-12 text-left md:w-1/2 md:flex-col md:py-24 md:px-5 ${
                promotionIndex > 1 ? `border-t` : ``
              }`}
            >
              <Star className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col gap-5">
                <h2 className="text-xl font-bold leading-tight tracking-tighter">
                  {promotion.title}
                </h2>
                <p className="text-gray-600 md:pr-12">{promotion.subtitle}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    )
  } else if (promotions.length === 3) {
    const [first, ...rest] = promotions

    return (
      <div className="border-t border-b border-gray-200">
        <Container className="grid md:grid-cols-2">
          <div className="-mx-5 flex justify-center gap-5 bg-gray-100 py-12 px-5 text-left md:mx-0 md:flex-col md:py-24 md:px-5">
            <Star className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl">
                {first.title}
              </h2>
              <p className="text-gray-600 md:pr-12 md:text-xl">
                {first.subtitle}
              </p>
            </div>
          </div>
          <div>
            {rest.map((promotion, promotionIndex) => (
              <div
                key={promotion._key}
                className={`flex gap-5 py-12 text-left md:flex-col md:py-24 md:px-5 ${
                  promotionIndex > 0 ? `border-t` : ``
                }`}
              >
                <Star className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-bold leading-tight tracking-tighter">
                    {promotion.title}
                  </h2>
                  <p className="text-gray-600 md:pr-12">{promotion.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="border-t border-b border-gray-200 py-24">
      <Container className="grid grid-cols-1 gap-y-24 text-center md:grid-cols-3 lg:grid-cols-5">
        {promotions.map((promotion) => (
          <div
            key={promotion._key}
            className="flex flex-col items-center gap-5"
          >
            <Star />
            <h2 className="px-5 text-xl font-bold leading-tight tracking-tighter">
              {promotion.title}
            </h2>
            <p className="px-10 text-xs text-gray-600">{promotion.subtitle}</p>
          </div>
        ))}
      </Container>
    </div>
  )
}
