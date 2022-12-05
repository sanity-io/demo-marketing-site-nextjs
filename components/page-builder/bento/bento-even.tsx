import { m, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import Container from '../../container'
import DebugLabel from '../../debug/debug-label'
import { DebugGrid } from '../../debug/grid'
import { ElementScrollStyle } from '../../framer-motion/useElementScroll'
import BentoArticleSmall from './article/small'

export default function BentoEven(props: {
  articles: (KeyedObject & ArticleStub)[]
}) {
  const { articles } = props

  return (
    <div>
      <div className="flex flex-col dark:divide-gray-900 md:flex-row">
        {articles.map((article, articleIndex) => (
          <ArticleEven
            key={article._key}
            article={article}
            articleIndex={articleIndex}
            articles={articles.length}
          />
        ))}
      </div>
    </div>
  )
}

function ArticleEven(props: {
  article: ArticleStub & KeyedObject
  articleIndex: number
  articles: number
}) {
  const { article, articleIndex, articles } = props
  const { ref, style } = useStyle((articleIndex / articles) * 0.15)

  return (
    <div
      ref={ref}
      className={
        // prettier-ignore
        `relative border-gray-200 text-left dark:border-gray-800 md:w-1/2 md:flex-col ${articleIndex !== 0 ? 'border-t' : ''} ${articleIndex % 2 ? 'md:border-l' : ''} ${articleIndex > 1 ? 'md:border-t' : 'md:border-t-0'}`
      }
    >
      <DebugLabel>bento-even</DebugLabel>

      <Container className="relative h-full">
        <DebugGrid columns={2} />

        <m.div ref={ref} style={style}>
          <BentoArticleSmall article={article} />
        </m.div>
      </Container>
    </div>
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
