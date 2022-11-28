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
      image?: SanityImageSource
    }[]
  }

export default function PageBuilderPromotion(props: PromotionProps) {
  const { _type, promotions } = props

  if (!promotions?.length) {
    return null
  } else if (promotions.length === 1) {
    const promotion = promotions[0]
    return (
      <div className="border-t border-b border-gray-200">
        <Container>
          <div className="flex flex-col items-center justify-center gap-5 py-24">
            <h2 className="text-center text-5xl font-bold leading-tight tracking-tighter">
              {promotion.title}
            </h2>
            <p className="max-w-xl text-center text-2xl text-gray-600">
              {promotion.subtitle}
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
              className={`flex flex-col gap-5 border-gray-200 py-24 md:w-1/2 ${
                promotionIndex > 1 ? `border-t` : ``
              }`}
            >
              <Star />
              <h2 className="text-xl font-bold leading-tight tracking-tighter">
                {promotion.title}
              </h2>
              <p className="pr-12 text-gray-600">{promotion.subtitle}</p>
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
          <div className="flex flex-col justify-center gap-5 bg-gray-100 p-10">
            <Star />
            <h2 className="text-2xl font-bold leading-tight tracking-tighter">
              {first.title}
            </h2>
            <p className="pr-12 text-gray-600">{first.subtitle}</p>
          </div>
          <div>
            {rest.map((promotion, promotionIndex) => (
              <div
                key={promotion._key}
                className={`flex flex-col gap-5 py-24 px-10 text-left ${
                  promotionIndex > 0 ? `border-t` : ``
                }`}
              >
                <Star />
                <h2 className="text-xl font-bold leading-tight tracking-tighter">
                  {promotion.title}
                </h2>
                <p className="pr-12 text-gray-600">{promotion.subtitle}</p>
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
