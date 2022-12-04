import Image from 'next/image'
import React from 'react'
import { KeyedObject } from 'sanity'

import { urlForImage } from '../../../sanity/sanity'
import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { inLeft, inSoftScale } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import { StyledPortableText } from '../portable-text/StyledPortableText'

export default function Bento3(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const { articles, index } = props
  const [first, ...rest] = articles
  const even = index % 2 == 0
  let high = <High first={first} articles={articles} />
  let cells = (
    <div className="flex flex-col">
      {rest.map((article, articleIndex) => (
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
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      <div className="max-h-xl grid divide-y divide-gray-200 dark:divide-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
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
  article: ArticleStub
  articleIndex: number
  articles: ArticleStub[]
}) {
  const image = article.image
  const hasText = article?.summary?.length > 0
  return (
    <div
      className={`flex items-center justify-center text-left md:h-1/2 md:flex-col ${
        articleIndex > 0 ? `border-t border-gray-200 dark:border-gray-800` : ``
      }`}
    >
      <ScrollProgressContainer>
        {image && !hasText ? (
          <AnimateScrollIn
            params={inLeft}
            startProgress={0.4 + (articleIndex / articles.length) * 0.3}
            stopProgress={0.6 + (articleIndex / articles.length) * 0.3}
            className="flex flex-col gap-3 py-12 "
          >
            <Container className="relative h-full w-full">
              <DebugGrid />
              <Image
                src={urlForImage(image).width(276).height(227).url()}
                width={276}
                height={227}
                alt={article.title ?? ``}
                className="rounded-lg object-cover"
              />
            </Container>
          </AnimateScrollIn>
        ) : (
          <AnimateScrollIn
            params={inSoftScale}
            startProgress={0.4 + (articleIndex / articles.length) * 0.3}
            stopProgress={0.6 + (articleIndex / articles.length) * 0.3}
          >
            <Container className="relative">
              <DebugGrid />
              <div className="flex flex-col gap-3 py-12 ">
                <div className="flex flex-col gap-5">
                  {hasText ? (
                    <div className="max-w-xl text-xl text-gray-700 dark:text-gray-200 md:text-2xl">
                      <StyledPortableText value={article?.summary} />
                    </div>
                  ) : null}
                </div>
              </div>
            </Container>
          </AnimateScrollIn>
        )}
      </ScrollProgressContainer>
    </div>
  )
}

function High({
  first,
  articles,
}: {
  first: ArticleStub
  articles: ArticleStub[]
}) {
  const hasText = first?.summary?.length > 0
  return (
    <ScrollProgressContainer className="flex items-center justify-center">
      <Container className="relative flex content-center justify-center">
        <AnimateScrollIn
          params={inSoftScale}
          startProgress={0.4 + (2 / articles.length) * 0.3}
          stopProgress={0.6 + (2 / articles.length) * 0.3}
          className="flex w-full"
        >
          <DebugGrid />

          <div className="flex w-full flex-col gap-3 py-12 text-left md:flex-row md:justify-center md:py-24">
            {first?.image ? (
              <div
                className={
                  'flex items-stretch justify-items-stretch self-stretch ' +
                  (hasText ? 'md:w-1/2' : 'w-full')
                }
              >
                <Image
                  src={urlForImage(first?.image)
                    .width(hasText ? 262 : 276 * 2)
                    .height(642)
                    .url()}
                  width={hasText ? 262 : 276 * 2}
                  height={642}
                  alt={first.title ?? ``}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ) : null}

            {hasText ? (
              <div className={first?.image ? 'md:w-1/2' : 'w-full'}>
                {first?.summary ? (
                  <div className="flex flex-col gap-5">
                    <div className="max-w-xl text-xl text-gray-700 dark:text-gray-200 md:text-2xl">
                      <StyledPortableText value={first?.summary} />
                    </div>
                  </div>
                ) : null}
                {/*  <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-extrabold font-extrabold leading-tight tracking-tight lg:text-3xl xl:text-5xl">
                      {first.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 md:pr-12 md:text-xl">
                      {first.subtitle}
                    </p>
                  </div>*/}
              </div>
            ) : null}
          </div>
        </AnimateScrollIn>
      </Container>
    </ScrollProgressContainer>
  )
}
