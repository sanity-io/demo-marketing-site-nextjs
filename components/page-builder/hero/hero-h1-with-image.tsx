import Image from 'next/image'
import React from 'react'

import {urlForImage} from '../../../sanity/sanity'
import Container from '../../container'
import Links from '../../links'
import {HeroSubtitle} from '../components/HeroSubtitle'
import {HeroSummary} from '../components/HeroSummary'
import {HeroTitle} from '../components/HeroTitle'
import {HeroProps} from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const {title, subtitle, summary, image, links} = props

  return (
    <div>
      <Container className="relative">
        <div className="flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 md:flex-row md:items-center md:py-5">
          <div className="relative flex w-full flex-col gap-4 py-5 sm:py-6 md:w-3/5 md:py-7 lg:py-8">
            {subtitle ? <HeroSubtitle subtitle={subtitle} /> : null}
            {title ? <HeroTitle title={title} /> : null}
            {summary?.length > 0 ? <HeroSummary summary={summary} /> : null}
            {links?.length > 0 ? <Links links={links} /> : null}
          </div>

          {image ? (
            <div className="flex w-full items-stretch justify-items-stretch self-stretch md:w-2/5 md:py-7 lg:py-8 ">
              <Image
                src={urlForImage(image).width(496).height(372).url()}
                width={496}
                height={372}
                alt={title ?? ``}
                className="h-full w-full rounded object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
