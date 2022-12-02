import { PortableText } from '@portabletext/react'

import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { popin } from '../../animation/scrollAnimations'
import Container from '../../container'

export default function Bento1(props: { article: ArticleStub }) {
  const { article } = props

  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex flex-col items-start gap-5 py-24 md:items-center md:justify-center">
          {article.subtitle ? (
            <AnimateScrollIn
              params={popin}
              startProgress={0.6}
              stopProgress={0.9}
            >
              <p className="max-w-xl rounded-full bg-magenta-400 px-5 py-2 text-2xl text-black md:text-center">
                {article.subtitle}
              </p>
            </AnimateScrollIn>
          ) : null}

          {article?.title ? (
            <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-center md:text-7xl">
              {article.title}
            </h2>
          ) : null}

          {article?.summary?.length > 0 ? (
            <div className="max-w-xl text-2xl text-gray-600 dark:text-gray-200 md:text-center">
              <PortableText value={article.summary} />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
