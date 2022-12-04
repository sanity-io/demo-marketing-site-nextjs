import Image from 'next/image'
import React from 'react'

import { urlForImage } from '../../../sanity/sanity'
import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { inFade, popin } from '../../animation/scrollAnimations'
import Container from '../../container'
import { StyledPortableText } from '../portable-text/StyledPortableText'

export default function Bento1(props: { article: ArticleStub; index: number }) {
  const { article, index } = props
  const { image } = article
  const hasText = !!(article.title || article.subtitle || article.summary)
  const even = index % 2 === 0
  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div
          className={
            'flex flex-col-reverse items-stretch justify-items-stretch py-4 sm:py-5 md:items-center md:py-5 ' +
            (even ? 'md:flex-row' : 'md:flex-row-reverse')
          }
        >
          {hasText ? (
            <div
              className={
                'gap -5 flex flex-col items-start py-6 md:py-24 ' +
                (image ? 'md:w-3/5 ' : '') +
                (even ? 'md:w-3/5 ' : 'pl-4')
              }
            >
              {article.subtitle ? (
                <AnimateScrollIn
                  params={image ? inFade : popin}
                  startProgress={0.6}
                  stopProgress={0.9}
                >
                  <div className="py-2">
                    <p
                      className={
                        'max-w-xl rounded-full text-2xl ' +
                        (image
                          ? 'text-magenta-500 dark:text-magenta-400'
                          : 'bg-magenta-400 px-5 py-2 text-black')
                      }
                    >
                      {article.subtitle}
                    </p>
                  </div>
                </AnimateScrollIn>
              ) : null}

              {article?.title ? (
                <h2 className="text-5xl font-extrabold leading-tight tracking-tight  md:text-7xl">
                  {article.title}
                </h2>
              ) : null}

              {article?.summary?.length > 0 ? (
                <div className="text-2xl text-gray-600 dark:text-gray-200 ">
                  <StyledPortableText value={article.summary} />
                </div>
              ) : null}
            </div>
          ) : null}
          {image && (
            <div
              className={
                'flex items-stretch justify-items-stretch self-stretch md:py-24 ' +
                (hasText ? 'w-full md:w-2/5' : 'm-auto w-full')
              }
            >
              <Image
                src={urlForImage(image)
                  .width(hasText ? 496 : 1112)
                  .height(hasText ? 372 : 834)
                  .url()}
                width={hasText ? 496 : 1112}
                height={hasText ? 372 : 834}
                alt={article.title ?? ``}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
