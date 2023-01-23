import clsx from 'clsx'
import Image from 'next/image'
import React, {PropsWithChildren} from 'react'
import {KeyedObject} from 'sanity'

import {urlForImage} from '../../../sanity/sanity'
import {ArticleStub} from '../../../types'
import Container from '../../container'
import {StyledPortableText} from '../portable-text/StyledPortableText'
import {BentoSubtitle} from './bento-1/BentoSubtitle'
import {BentoTitle} from './bento-1/BentoTitle'
import {BentoNumberCallout, isBentoNumberCallout} from './bento-number-callout'

export default function Bento3(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const {articles, index} = props
  const [first, ...rest] = articles
  const reverse = index % 4 == 0
  const high = <High first={first} />
  const cells = (
    <div className="flex flex-col">
      {rest.map((article, articleIndex) => {
        const Component = isBentoNumberCallout(article)
          ? BentoNumberCallout
          : Small
        return (
          <CellWrapper key={article._key} articleIndex={articleIndex}>
            <Container>
              <Component article={article} />
            </Container>
          </CellWrapper>
        )
      })}
    </div>
  )
  return (
    <div>
      <div className="max-h-xl grid divide-y divide-gray-200 dark:divide-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {reverse ? high : cells}
        {reverse ? cells : high}
      </div>
    </div>
  )
}

function CellWrapper({
  articleIndex,
  children,
}: PropsWithChildren<{articleIndex: number}>) {
  return (
    <div
      className={clsx(
        `flex items-center justify-center text-left lg:h-1/2 lg:flex-col lg:py-12`,
        articleIndex > 0 && `border-t border-gray-200 dark:border-gray-800`
      )}
    >
      {children}
    </div>
  )
}

export function Small({article}: {article: ArticleStub}) {
  const image = article.image
  const hasText =
    article.title || article.subtitle || article?.summary?.length > 0
  return (
    <>
      {image && !hasText ? (
        <div className="relative h-full w-full">
          <Image
            src={urlForImage(image).width(276).height(227).url()}
            width={276}
            height={227}
            alt={article.title ?? ``}
            className="rounded object-cover"
          />
        </div>
      ) : (
        <div className="relative flex h-full flex-col gap-3 py-12">
          <BentoSubtitle subtitle={article.subtitle} />
          <BentoTitle title={article.title} />
          {article?.summary?.length > 0 ? (
            <div className="max-w-xl text-xl text-gray-700 dark:text-gray-200 lg:text-2xl">
              <StyledPortableText value={article?.summary} />
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

function High({first}: {first: ArticleStub}) {
  const hasText = first.title || first.subtitle || first?.summary?.length > 0
  return (
    <Container className="relative flex content-center justify-center from-black via-magenta-900 bg-gradient-to-tl">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full gap-5 py-12 lg:flex-col lg:justify-center lg:py-24">
          {first?.image ? (
            <div
              className={clsx(
                `flex items-stretch justify-items-stretch self-stretch`,
                hasText ? '' : 'w-1/2 flex-shrink-0 lg:w-full'
              )}
            >
              <Image
                src={urlForImage(first.image).width(960).height(540).url()}
                width={960}
                height={540}
                alt={first.title ?? ``}
                className="h-48 w-full rounded-lg object-cover"
              />
            </div>
          ) : null}

          {hasText ? (
            <div className='flex flex-col gap-4'>
              <BentoSubtitle subtitle={first.subtitle} />
              <BentoTitle title={first.title} />

              {first?.summary?.length > 0 ? (
                <div className="flex flex-col gap-5 text-xl text-gray-700 dark:text-gray-200 lg:text-2xl">
                  <StyledPortableText value={first?.summary} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  )
}
