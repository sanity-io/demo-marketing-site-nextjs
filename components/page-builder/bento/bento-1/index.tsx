import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../../sanity/sanity'
import { ArticleStub } from '../../../../types'
import Container from '../../../container'
import { BentoSubtitle } from './BentoSubtitle'
import { BentoSummary } from './BentoSummary'
import { BentoTitle } from './BentoTitle'

export default function Index(props: { article: ArticleStub; index: number }) {
  const { article, index } = props
  const { image } = article
  const hasText = !!(article.title || article.subtitle || article.summary)
  const even = index % 2 === 0
  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div
          className={
            'flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 md:items-center md:py-5 ' +
            (even ? 'md:flex-row' : 'md:flex-row-reverse')
          }
        >
          {hasText ? (
            <div
              className={
                'gap -5 flex flex-col items-start py-6 md:py-24 ' +
                (image ? 'md:w-3/5 ' : '') +
                (even ? 'md:w-3/5 ' : 'pl-4')
              }
            >
              <BentoSubtitle
                subtitle={article?.subtitle}
                type={image ? 'plain' : 'pill'}
              />

              <BentoTitle title={article?.title} />

              <BentoSummary summary={article?.summary} />
            </div>
          ) : null}
          {image && (
            <div
              className={
                'flex items-stretch justify-items-stretch self-stretch md:py-24 ' +
                (hasText ? 'w-full md:w-2/5' : 'm-auto w-full')
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
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
