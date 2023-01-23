import {Icon, IconSymbol} from '@sanity/icons'
import clsx from 'clsx'
import Image from 'next/image'
import React, {PropsWithChildren} from 'react'
import {KeyedObject} from 'sanity'

import {urlForImage} from '../../../sanity/sanity'
import {ArticleStub} from '../../../types'
import Container from '../../Fix/Container'
import {BentoNumberCallout, isBentoNumberCallout} from './BentoNumberCallout'

export default function BentoEven(props: {
  articles: (KeyedObject & ArticleStub)[]
}) {
  const {articles} = props

  return (
    <div>
      <div className="flex flex-col dark:divide-gray-800 lg:flex-row lg:flex-wrap">
        {articles.map((article, articleIndex) => {
          const Component = isBentoNumberCallout(article)
            ? BentoNumberCallout
            : ArticleEven
          return (
            <CellWrapper
              key={article._key}
              articleIndex={articleIndex}
              articles={articles}
            >
              <Component article={article} />
            </CellWrapper>
          )
        })}
      </div>
    </div>
  )
}

function CellWrapper({
  articleIndex,
  articles,
  children,
}: PropsWithChildren<{articleIndex: number; articles: ArticleStub[]}>) {
  return (
    <div
      className={clsx(
        `border-gray-200 py-4 text-left dark:border-gray-800 sm:py-5 lg:w-1/2 lg:flex-col`,
        {
          'xl:w-1/4': articles.length === 4,
          'border-t': articleIndex !== 0,
          'lg:border-l': articleIndex % 4 !== 0,
        },
        articleIndex > 1 ? 'lg:border-t' : 'lg:border-t-0'
      )}
    >
      <div>{children}</div>
    </div>
  )
}

function ArticleEven(props: {article: ArticleStub & KeyedObject}) {
  const {article} = props
  const hasText = !!(article.title || article.subtitle)

  return (
    <Container className="relative flex gap-3 py-12 lg:py-24 lg:px-5">
      {hasText ? (
        <div>
          {article?.icon ? (
            <div className="text-4xl">
              <Icon symbol={article.icon as IconSymbol} />
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold leading-tight tracking-tight">
              {article.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-200 lg:pr-12">
              {article.subtitle}
            </p>
          </div>
        </div>
      ) : null}
      {article.image && !hasText ? (
        <div
          className={
            'flex w-full items-stretch justify-items-stretch self-stretch'
          }
        >
          <div
            className="m-auto flex items-stretch justify-items-stretch self-stretch"
            style={{height: 276}}
          >
            <Image
              src={urlForImage(article.image).width(276).height(227).url()}
              width={276}
              height={227}
              alt={article.title ?? ``}
              className="h-full w-full rounded object-cover"
            />
          </div>
        </div>
      ) : null}
    </Container>
  )
}
