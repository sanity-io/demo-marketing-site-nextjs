import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useMemo, useRef } from 'react'

import { urlForImage } from '../../../../sanity/sanity'
import { ArticleStub } from '../../../../types'
import Container from '../../../container'
import DebugLabel from '../../../debug/debug-label'
import { DebugGrid } from '../../../debug/grid'
import { ElementScrollStyle } from '../../../framer-motion/useElementScroll'
import {
  BentoNumberCallout,
  isBentoNumberCallout,
} from '../bento-number-callout'
import { BentoSubtitle } from './BentoSubtitle'
import { BentoSummary } from './BentoSummary'
import { BentoTitle } from './BentoTitle'

export default function Index(props: { article: ArticleStub; index: number }) {
  const { article, index } = props
  const { image } = article
  const hasText = !!(article.title || article.subtitle || article.summary)
  const even = index % 2 === 0

  const { ref: imageRef, style: imageStyle } = useImageStyle()
  const articles = useMemo(() => [article], [article])

  if (isBentoNumberCallout(article)) {
    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <BentoNumberCallout
          article={article}
          articleIndex={index}
          articles={articles}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      <DebugLabel>bento-1</DebugLabel>

      <Container className="relative">
        <DebugGrid columns={5} />

        <div
          className={
            'flex flex-col-reverse items-stretch justify-items-stretch py-5 sm:py-6 md:items-center md:py-7 lg:py-8 ' +
            'md:flex-row'
            // (even ? 'md:flex-row' : 'md:flex-row-reverse')
          }
        >
          {hasText ? (
            <div
              className={
                'text-container p-4 sm:p-5 md:w-[60%] md:py-6 lg:py-7 xl:py-8' +
                ''
                // (image ? 'md:w-3/5 ' : '') +
                // (even ? 'md:w-3/5 ' : 'pl-4')
              }
            >
              {article?.subtitle && (
                <BentoSubtitle
                  subtitle={article?.subtitle}
                  // type={image ? 'plain' : 'pill'}
                />
              )}

              {article?.title && <BentoTitle title={article?.title} />}

              {article.summary && article.summary.length > 0 && (
                <BentoSummary summary={article?.summary} />
              )}
            </div>
          ) : null}

          {image && (
            <m.div
              ref={imageRef}
              style={imageStyle}
              className={
                'flex items-stretch justify-items-stretch self-stretch p-2 ' +
                'md:w-[40%]'
                // (hasText ? 'w-full md:w-2/5' : 'm-auto w-full')
              }
            >
              <Image
                src={urlForImage(image)
                  .width(hasText ? 496 : 1112)
                  .height(hasText ? 372 : 834)
                  .url()}
                width={hasText ? 496 : 1112}
                height={hasText ? 372 : 834}
                alt={article.title ?? ``}
                className="h-full w-full rounded-lg object-cover"
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
  const { scrollYProgress } = useScroll({
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
