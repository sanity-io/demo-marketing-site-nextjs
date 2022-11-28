import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Star } from 'lucide-react'
import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import Container from '../container'

type FeatureProps = KeyedObject &
  TypedObject & {
    features: {
      _key: string
      _type: 'feature'
      title?: string
      subtitle?: string
      image?: SanityImageSource
    }[]
  }

export default function PageBuilderFeature(props: FeatureProps) {
  const { _type, features } = props

  if (!features?.length) {
    return null
  } else if (features.length === 1) {
    const feature = features[0]
    return (
      <div className="border-t border-b border-gray-200">
        <Container>
          <div className="py-24 flex flex-col gap-5 items-center justify-center">
            <h2 className="text-center text-5xl font-bold leading-tight tracking-tighter">
              {feature.title}
            </h2>
            <p className="max-w-xl text-center text-2xl text-gray-500">{feature.subtitle}</p>
          </div>
        </Container>
      </div>
    )
  } else if (features.length === 2 || features.length === 4) {
    return (
      <div className="border-t border-b border-gray-200">
        <Container className="flex flex-col md:flex-row md:flex-wrap">
          {features.map((feature, featureIndex) => (
            <div
              key={feature._key}
              className={`flex flex-col gap-5 border-gray-200 py-24 md:w-1/2 ${
                featureIndex > 1 ? `border-t` : ``
              }`}
            >
              <Star />
              <h2 className="text-xl font-bold leading-tight tracking-tighter">
                {feature.title}
              </h2>
              <p className="pr-12 text-gray-500">{feature.subtitle}</p>
            </div>
          ))}
        </Container>
      </div>
    )
  } else if (features.length === 3) {
    const [first, ...rest] = features

    return (
      <div className="border-t border-b border-gray-200">
        <Container className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 bg-gray-100 p-10">
            <Star />
            <h2 className="text-2xl font-bold leading-tight tracking-tighter">
              {first.title}
            </h2>
            <p className="pr-12 text-gray-500">{first.subtitle}</p>
          </div>
          <div>
            {rest.map((feature, featureIndex) => (
              <div
                key={feature._key}
                className={`flex flex-col gap-5 py-24 px-10 text-left ${
                  featureIndex > 0 ? `border-t` : ``
                }`}
              >
                <Star />
                <h2 className="text-xl font-bold leading-tight tracking-tighter">
                  {feature.title}
                </h2>
                <p className="pr-12 text-gray-500">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="border-t border-b border-gray-200 py-24">
      <Container className="grid grid-cols-1 gap-y-24 md:grid-cols-3 lg:grid-cols-5 text-center">
        {features.map((feature) => (
          <div key={feature._key} className="flex flex-col items-center gap-5">
            <Star />
            <h2 className="px-5 text-xl font-bold leading-tight tracking-tighter">
              {feature.title}
            </h2>
            <p className="px-10 text-xs text-gray-500">{feature.subtitle}</p>
          </div>
        ))}
      </Container>
    </div>
  )
}
