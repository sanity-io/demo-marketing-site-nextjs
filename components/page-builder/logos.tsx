import { getImageDimensions } from '@sanity/asset-utils'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import delve from 'dlv'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
import { AnimeScroll } from '../animation/AnimeScroll'
import { enterElasticBottom } from '../animation/scrollAnimations'
import Container from '../container'
import { DebugGrid } from '../debug/grid'

type PageBuilderLogosProps = KeyedObject &
  TypedObject & {
    logos?: {
      _id: string
      name?: string
      logo?: {
        asset: SanityImageSource
      }
    }[]
  }

export default function PageBuilderLogos(props: PageBuilderLogosProps) {
  const { logos } = props

  if (!logos?.length) {
    return null
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-800">
      <Container className="relative w-full py-5 sm:py-6 md:py-7">
        <DebugGrid />

        <div className="mb-4 text-center text-gray-700 dark:text-gray-200 sm:mb-5">
          Trusted by millions of teams
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {logos.map((company, i) => {
            const ref = delve(company, 'logo.asset._ref')

            if (!ref) {
              return null
            }

            // TODO: adjust width/height based on vertical/landscape logos
            const { width, height } = getImageDimensions(ref)

            return (
              <AnimeScroll
                key={company._id}
                params={enterElasticBottom}
                startProgress={0.4 + (i / logos.length) * 0.05}
                stopProgress={0.5 + (i / logos.length) * 0.05}
              >
                {/* <img
              className="h-auto w-[50px] flex-shrink-0 md:w-[100px]"
              // TODO: Adjust if the file is not an SVG
              src={urlForImage(company.logo).url()}
              alt={company?.name}
              width={width}
              height={height}
            /> */}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={company._id}
                  className="h-auto w-[50px] flex-shrink-0 md:w-[100px]"
                  // TODO: Adjust if the file is not an SVG
                  src={urlForImage(company.logo).url()}
                  alt={company?.name}
                  width={width}
                  height={height}
                />
              </AnimeScroll>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
