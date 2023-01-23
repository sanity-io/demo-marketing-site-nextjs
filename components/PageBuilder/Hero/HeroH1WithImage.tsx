import Image from 'next/image'
import React from 'react'

import {urlForImage} from '../../../sanity/sanity'
import Container from '../../Container'
import Links from '../../Links'
import {HeroSubtitle} from '../HeroSubtitle'
import {HeroSummary} from '../HeroSummary'
import {HeroTitle} from '../HeroTitle'
import {HeroProps} from '.'

export default function HeroH1WithImage(props: HeroProps) {
  const {title, subtitle, summary, image, links} = props

  return (
    <div>
      <Container className="relative">
        <div className="flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 lg:flex-row lg:items-center lg:py-5">
          <div className="relative flex w-full flex-col gap-4 py-5 sm:py-6 lg:w-3/5 lg:py-8">
            {subtitle ? <HeroSubtitle subtitle={subtitle} /> : null}
            {title ? <HeroTitle title={title} /> : null}
            {summary?.length > 0 ? <HeroSummary summary={summary} /> : null}
            {links?.length > 0 ? <Links links={links} /> : null}
          </div>

          {image ? (
            <div className="flex w-full lg:w-2/5 lg:py-8">
              <Image
                src={urlForImage(image).width(960).height(540).url()}
                width={960}
                height={540}
                alt={title ?? ``}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
