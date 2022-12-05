import { m, useTransform } from 'framer-motion'
import React from 'react'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import {
  ElementScrollStyle,
  useElementScroll,
} from '../../framer-motion/useElementScroll'
import BentoArticleSmall from './article/small'
import BentoArticleTall from './article/tall'

export default function Bento3(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const { articles, index } = props
  const [firstArticle, ...restArticles] = articles
  const even = index % 2 === 0

  const high = <Tall article={firstArticle} />

  const cells = (
    <div className="flex flex-col">
      {restArticles.map((article, articleIndex) => (
        <Small
          key={article._key}
          article={article}
          articleIndex={articleIndex}
          articles={articles}
        />
      ))}
    </div>
  )

  return (
    <div>
      <div className="grid divide-y divide-gray-200 dark:divide-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
        {even ? high : cells}
        {even ? cells : high}
      </div>
    </div>
  )
}

function Small({
  article,
  articleIndex,
  articles,
}: {
  article: ArticleStub & KeyedObject
  articleIndex: number
  articles: ArticleStub[]
}) {
  const { ref, style } = useStyle((2 / articles.length) * 0.3)

  return (
    <div
      className={`flex items-center justify-center text-left md:h-1/2 md:flex-col ${
        articleIndex > 0 ? `border-t border-gray-200 dark:border-gray-800` : ``
      }`}
    >
      <Container className="relative h-full">
        <DebugGrid columns={2} />

        <m.div ref={ref} style={style}>
          <BentoArticleSmall article={article} />
        </m.div>
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
  const {
    ref,
    scroll: { scrollYProgress },
  } = useElementScroll()
  const scrollRange = [0, 0.2].map((r) => r + offset)
  const scale = useTransform(scrollYProgress, scrollRange, [0.9, 1])
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1])

  return {
    ref,
    style: {
      scale,
      opacity,
    },
  }
}
