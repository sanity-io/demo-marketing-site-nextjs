import {m, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import React, {useRef} from 'react'

import {urlForImage} from '../../../../sanity/sanity'
import {ArticleStub} from '../../../../types'
import Container from '../../../container'
import {ElementScrollStyle} from '../../../framer-motion/useElementScroll'
import Links from '../../../links'
import {BentoNumberCallout, isBentoNumberCallout} from '../bento-number-callout'
import {BentoSubtitle} from './BentoSubtitle'
import {BentoSummary} from './BentoSummary'
import {BentoTitle} from './BentoTitle'

export default function Index(props: {article: ArticleStub; index: number}) {
  const {article, index} = props
  const {image} = article
  const hasText = !!(article.title || article.subtitle || article.summary)
  const even = index % 2 === 0

  const {ref: imageRef, style: imageStyle} = useImageStyle()
  if (isBentoNumberCallout(article)) {
    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <BentoNumberCallout article={article} />
      </div>
    )
  }

  return (
    <div>
      <Container>
        <div
          className={`flex flex-col-reverse items-stretch justify-items-stretch gap-5 py-4 sm:py-5 md:items-center md:py-5 ${
            image ? (even ? 'md:flex-row' : 'md:flex-row-reverse') : ''
          }`}
        >
          {hasText ? (
            <div
              className={`flex flex-col items-start gap-4 py-6 md:py-24 ${
                image ? 'md:w-3/5 ' : ''
              }`}
            >
              <BentoSubtitle subtitle={article?.subtitle} className="" />

              <BentoTitle title={article?.title} />

              <BentoSummary summary={article?.summary} />

              {article.links ? <Links links={article.links} /> : null}
            </div>
          ) : null}
          {image && (
            <m.div
              ref={imageRef}
              style={imageStyle}
              className={`flex items-stretch justify-items-stretch self-stretch md:py-24${
                hasText ? 'w-full md:w-2/5' : 'm-auto w-full'
              }`}
            >
              <Image
                src={urlForImage(image)
                  .width(hasText ? 496 : 1112)
                  .height(hasText ? 372 : 834)
                  .url()}
                width={hasText ? 496 : 1112}
                height={hasText ? 372 : 834}
                alt={article.title ?? ``}
                className="h-full w-full rounded object-cover"
              />
            </m.div>
          )}
        </div>
      </Container>
    </div>
  )
}

function useImageStyle(): ElementScrollStyle {
  const ref = useRef(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scrollRange = [0, 0.4, 0.7, 1]
  const scale = useTransform(scrollYProgress, scrollRange, [1.05, 1, 1, 0.7])
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1, 1, 0])
  return {
    ref,
    style: {
      scale,
      opacity,
      top: scrollYProgress,
    },
  }
}
