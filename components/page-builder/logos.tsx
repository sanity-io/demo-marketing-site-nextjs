import { getImageDimensions } from '@sanity/asset-utils'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import delve from 'dlv'
import { KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'

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
    <div className="my-3 flex flex-wrap items-center justify-center gap-5 bg-theme px-3 py-5 md:my-5 md:gap-5 md:p-5">
      {logos.map((company) => {
        const ref = delve(company, 'logo.asset._ref')

        if (!ref) {
          return null
        }

        // TODO: adjust width/height based on vertical/landscape logos
        const { width, height } = getImageDimensions(ref)

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={company._id}
            className="h-auto w-[50px] flex-shrink-0 md:w-[100px]"
            // TODO: Adjust if the file is not an SVG
            src={urlForImage(company.logo).url()}
            alt={company?.name}
            width={width}
            height={height}
          />
        )
      })}
    </div>
  )
}
