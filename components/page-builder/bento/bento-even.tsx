import { Icon, IconSymbol } from '@sanity/icons'
import { AnimeParams } from 'animejs'
import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'
import { KeyedObject } from 'sanity'

import { urlForImage } from '../../../sanity/sanity'
import { ArticleStub } from '../../../types'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import { ElementScrollStyle } from '../../framer-motion/useElementScroll'

export const fadeOutParams: AnimeParams = {
  opacity: [1, 0],
  easing: 'easeOutSine',
}

export default function BentoEven(props: {
  articles: (KeyedObject & ArticleStub)[]
}) {
  const { articles } = props

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row md:flex-wrap">
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
  const image = { article }
  const hasText = !!(article.title || article.subtitle)
  const { ref, style } = useStyle((articleIndex / articles) * 0.15)

  return (
    <div
      ref={ref}
      className={`border-t border-gray-200 text-left dark:border-gray-800 md:w-1/2 md:flex-col ${
        articleIndex % 2 ? 'md:border-l' : ''
      }`}
    >
      <Container className="relative flex gap-3 py-12 md:py-24 md:px-5">
        <m.div ref={ref} style={style}>
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
