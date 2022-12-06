import { m, useScroll, useTransform } from 'framer-motion'
import React, { PropsWithChildren, useRef } from 'react'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import { ElementScrollStyle } from '../../framer-motion/useElementScroll'
import BentoArticleSmall from './article/small'
import BentoArticleTall from './article/tall'
import {
  BentoNumberCallout,
  isBentoNumberCallout,
} from './bento-number-callout'

export default function Bento3(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const { articles, index } = props
  const [firstArticle, ...restArticles] = articles
  const reverse = index % 4 === 0

  const high = <Tall article={firstArticle} />

  const cells = (
    <div className="flex flex-col">
      {restArticles.map((article, articleIndex) => {
        const Component = isBentoNumberCallout(article)
          ? BentoNumberCallout
          : Small
        return (
          <CellWrapper key={article._key} articleIndex={articleIndex}>
            <Container>
              <Component
                article={article}
                articleIndex={articleIndex}
                articles={articles}
              />
            </Container>
          </CellWrapper>
        )
      })}
    </div>
  )

  return (
    <div>
      <div className="grid divide-y divide-gray-200 dark:divide-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
        {reverse ? high : cells}
        {reverse ? cells : high}
      </div>
    </div>
  )
}

function CellWrapper({
  articleIndex,
  children,
}: PropsWithChildren<{ articleIndex: number }>) {
  const { ref, style } = useStyle(0)
  return (
    <div
      className={`flex items-center justify-center text-left md:h-1/2 md:flex-col ${
        articleIndex > 0 ? `border-t border-gray-200 dark:border-gray-800` : ``
      }`}
    >
      <m.div ref={ref} style={style}>
        {children}
      </m.div>
    </div>
  )
}

export function Small({
  article,
  articleIndex,
}: {
  article: ArticleStub & KeyedObject
  articleIndex: number
  articles: ArticleStub[]
}) {
  return (
    <div
      className={`flex items-center justify-center text-left md:h-1/2 md:flex-col ${
        articleIndex > 0 ? `border-t border-gray-200 dark:border-gray-800` : ``
      }`}
    >
      <Container className="relative h-full">
        <DebugGrid columns={2} />
        <BentoArticleSmall article={article} />
      </Container>
    </div>
  )
}

function Tall({ article }: { article: ArticleStub }) {
  const { ref, style } = useStyle(0.2)

  return (
    <Container className="relative">
      <DebugGrid columns={2} />

      <m.div layout style={style}>
        <div ref={ref}>
          <BentoArticleTall article={article} />
        </div>
      </m.div>
    </Container>
  )
}

function useStyle(offset: number): ElementScrollStyle {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const scrollRange = [0, 0.6].map((r) => r + offset)
  const scale = useTransform(scrollYProgress, scrollRange, [0.7, 1])
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1])

  return {
    ref,
    style: {
      scale,
      opacity,
    },
  }
}
