import {m, useScroll, useTransform} from 'framer-motion'
import Image from 'next/image'
import React, {PropsWithChildren, useRef} from 'react'
import {KeyedObject} from 'sanity'

import {urlForImage} from '../../../sanity/sanity'
import {ArticleStub} from '../../../types'
import Container from '../../container'
import {ElementScrollStyle} from '../../framer-motion/useElementScroll'
import {StyledPortableText} from '../portable-text/StyledPortableText'
import {BentoSubtitle} from './bento-1/BentoSubtitle'
import {BentoTitle} from './bento-1/BentoTitle'
import {Small} from './bento-3'
import {BentoNumberCallout, isBentoNumberCallout} from './bento-number-callout'

export default function Bento3Wide(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const {articles, index} = props
  const [first, ...rest] = articles
  const even = index % 2 == 0
  const high = <Wide first={first} />
  const cells = (
    <div className="flex flex-col lg:flex-row">
      {rest.map((article, articleIndex) => {
        const Component = isBentoNumberCallout(article)
          ? BentoNumberCallout
          : Small
        return (
          <CellWrapper key={article._key} articleIndex={articleIndex}>
            <Component article={article} />
          </CellWrapper>
        )
      })}
    </div>
  )
  return (
    <div className="max-h-xl">
      {even ? cells : high}
      <div className="border-t border-gray-200 dark:border-gray-800">
        {even ? high : cells}
      </div>
    </div>
  )
}

function CellWrapper({
  articleIndex,
  children,
}: PropsWithChildren<{articleIndex: number}>) {
  const {ref, style} = useStyle(0)
  return (
    <Container
      className={`flex items-center justify-center text-left md:h-1/2 md:flex-col ${
        articleIndex > 0
          ? `border-gray-200 dark:border-gray-800 sm:max-md:border-t lg:border-l`
          : ``
      }`}
    >
      <m.div ref={ref} style={style}>
        {children}
      </m.div>
    </Container>
  )
}

function Wide({first}: {first: ArticleStub}) {
  const hasText = first.title || first.subtitle || first?.summary?.length > 0
  const {ref, style} = useStyle(0)
  return (
    <Container className="relative flex py-4">
      <m.div
        layout
        className="stretch-self flex w-full items-center"
        style={style}
      >
        <div className="flex w-full flex-col gap-5 py-12 text-left" ref={ref}>
          {hasText ? (
            <div className={'flex w-full flex-col gap-5'}>
              <BentoSubtitle subtitle={first.subtitle} />
              <BentoTitle title={first.title} />

              {first?.summary?.length > 0 ? (
                <div className="text-l max-w-xl text-gray-700 dark:text-gray-200 md:text-xl">
                  <StyledPortableText value={first?.summary} />
                </div>
              ) : null}
            </div>
          ) : null}
          {first?.image ? (
            <div
              className={
                'flex w-full items-stretch justify-items-stretch self-stretch'
              }
            >
              <Image
                src={urlForImage(first?.image).width(1280).height(512).url()}
                width={1280}
                height={512}
                alt={first.title ?? ``}
                className="h-full w-full rounded object-cover"
              />
            </div>
          ) : null}
        </div>
      </m.div>
    </Container>
  )
}
function useStyle(offset: number): ElementScrollStyle {
  const ref = useRef(null)
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const scrollRange = [0, 0.6].map((r) => r + offset)
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1])
  return {
    ref,
    style: {
      opacity,
    },
  }
}
