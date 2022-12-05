import { getImageDimensions } from '@sanity/asset-utils'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import delve from 'dlv'
import { m } from 'framer-motion'
import { useRef } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
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
  const ref = useRef()
  if (!logos?.length) {
    return null
  }

  return (
    <div ref={ref}>
      <Container className="relative w-full py-5 sm:py-6 md:py-7">
        <DebugGrid />

        <div className="mb-4 text-center text-gray-700 dark:text-gray-200 sm:mb-5">
          Trusted by industry leaders
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {logos.map((company, i) => {
            const ref = delve(company, 'logo.asset._ref')

            if (!ref) {
              return null
            }

            // TODO: adjust width/height based on vertical/landscape logos
            const { width, height } = getImageDimensions(ref)

            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-auto w-[50px] flex-shrink-0 md:w-[100px]"
                // TODO: Adjust if the file is not an SVG
                src={urlForImage(company.logo).url()}
                alt={company?.name}
                width={width}
                height={height}
              />
            )
            return (
              <m.div
                key={company._id}
                initial={{ translateY: 100 }}
                whileInView={{ translateY: 0 }}
                viewport={{
                  amount: 'all',
                  margin: '100px',
                  root: ref,
                }}
                transition={{
                  type: 'spring',
                  delay: 0.6 * (i / logos.length),
                  velocity: 60,
                }}
              >
                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    amount: 'all',
                    margin: '100px',
                    root: ref,
                  }}
                  transition={{ delay: 0.6 * (i / logos.length) }}
                >
                  {img}
                </m.div>
              </m.div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
