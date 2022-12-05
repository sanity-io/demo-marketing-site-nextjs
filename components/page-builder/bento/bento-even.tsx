import { Icon, IconSymbol } from '@sanity/icons'
import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { PropsWithChildren, useRef } from 'react'
import { KeyedObject } from 'sanity'

import { urlForImage } from '../../../sanity/sanity'
import { ArticleStub } from '../../../types'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import { ElementScrollStyle } from '../../framer-motion/useElementScroll'
import {
  BentoNumberCallout,
  isBentoNumberCallout,
} from './bento-number-callout'

export default function BentoEven(props: {
  articles: (KeyedObject & ArticleStub)[]
}) {
  const { articles } = props

  return (
    <div>
      <div className="flex flex-col dark:divide-gray-800 md:flex-row">
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
              <Component
                article={article}
                articleIndex={articleIndex}
                articles={articles}
              />
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
}: PropsWithChildren<{ articleIndex: number; articles: ArticleStub[] }>) {
  const { ref, style } = useStyle((articleIndex / articles.length) * 0.15)
  return (
    <div
      ref={ref}
      className={
        // prettier-ignore
        `border-gray-200 text-left dark:border-gray-800 md:w-1/2 md:flex-col ${articleIndex !== 0 ? 'border-t' : ''} ${articleIndex % 4 != 0 ? 'md:border-l' : ''} ${articleIndex > 1 ? 'md:border-t' : 'md:border-t-0'}`
      }
    >
      <m.div style={style}>{children}</m.div>
    </div>
  )
}

function ArticleEven(props: {
  article: ArticleStub & KeyedObject
  articleIndex: number
  articles: ArticleStub[]
}) {
  const { article } = props
  const hasText = !!(article.title || article.subtitle)

  return (
    <Container className="relative flex gap-3 py-12 md:py-24 md:px-5">
      <DebugGrid />
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
            <p className="text-gray-600 dark:text-gray-200 md:pr-12">
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
            style={{ height: 276 }}
          >
            <Image
              src={urlForImage(article.image).width(276).height(227).url()}
              width={276}
              height={227}
              alt={article.title ?? ``}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
      ) : null}
    </Container>
  )
}

function useStyle(offset: number): ElementScrollStyle {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const scrollRange = [0, 0.0, 0.4].map((r) => r + offset)
  const translateY = useTransform(scrollYProgress, scrollRange, [105, 105, 0])
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 0, 1])

  return {
    ref,
    style: {
      translateY,
      opacity,
    },
  }
}
