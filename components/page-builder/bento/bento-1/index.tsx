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
  const even = index % 2 === 0

  if (isBentoNumberCallout(article)) {
    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <BentoNumberCallout article={article} />
      </div>
    )
  }

  const {subtitle, title, summary = [], links = []} = article

  return (
    <div>
      <Container>
        <div className="grid grid-cols-5 gap-4 py-6 lg:gap-6 lg:py-24">
          {image ? (
            <>
              <div
                className={clsx(
                  `relative col-span-1 row-start-1 flex items-center gap-4 lg:col-span-1 lg:gap-6`,
                  even ? `col-start-1` : `col-start-5`
                )}
              >
                <div className="absolute aspect-square w-full rounded-full bg-magenta-400 opacity-50 blur-3xl" />
                <Image
                  src={urlForImage(image).width(300).height(300).url()}
                  width={300}
                  height={300}
                  alt={article.title ?? ``}
                  className="relative aspect-square w-full rounded-full object-cover"
                />
              </div>
              <div
                className={clsx(
                  `col-span-4 row-start-1 flex flex-col justify-center`,
                  even ? `col-start-2 items-start` : `col-start-1 items-end`
                )}
              >
                {subtitle ? <BentoSubtitle subtitle={subtitle} /> : null}
                {title ? <BentoTitle title={title} /> : null}
              </div>
            </>
          ) : null}
          {!image && subtitle ? <BentoSubtitle subtitle={subtitle} /> : null}
          {!image && title ? <BentoTitle title={title} /> : null}
          {summary?.length > 0 ? (
            <div
              className={clsx(
                `col-span-5 row-start-2 lg:col-span-3 lg:col-start-2`,
                !even && `text-right`
              )}
            >
              <BentoSummary summary={summary} />
            </div>
          ) : null}
          {links?.length > 0 ? (
            <div className="col-span-5 row-start-3 lg:col-span-3 lg:col-start-2">
              <Links
                links={article.links}
                className={!even && `lg:justify-end`}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
