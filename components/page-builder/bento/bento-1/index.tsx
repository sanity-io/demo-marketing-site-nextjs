import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import {urlForImage} from '../../../../sanity/sanity'
import {ArticleStub} from '../../../../types'
import Container from '../../../container'
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

  if (isBentoNumberCallout(article)) {
    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <BentoNumberCallout article={article} />
      </div>
    )
  }

  let rowClass = ''
  if (image) {
    rowClass = even ? 'md:flex-row' : 'md:flex-row-reverse'
  }

  return (
    <div>
      <Container>
        <div
          className={clsx(
            `flex flex-col-reverse items-stretch justify-items-stretch gap-5 py-4 sm:py-5 md:items-center md:py-5`,
            image && even ? 'md:flex-row' : null,
            image && !even ? 'md:flex-row-reverse' : null
          )}
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
            <div
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
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
