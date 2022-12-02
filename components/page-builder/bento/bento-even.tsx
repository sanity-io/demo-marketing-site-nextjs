import { Icon, IconSymbol } from '@sanity/icons'
import { AnimeParams } from 'animejs'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { AnimateScrollOut } from '../../animation/AnimateScrollOut'
import { enterSoftBottom } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'

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
          <div
            key={article._key}
            className={`border-t border-gray-200 text-left dark:border-gray-800 md:w-1/2 md:flex-col ${
              articleIndex % 2 ? 'md:border-l' : ''
            }`}
          >
            <ScrollProgressContainer>
              <AnimateScrollIn
                params={enterSoftBottom}
                startProgress={0.3 + (articleIndex / articles.length) * 0.3}
                stopProgress={0.5 + (articleIndex / articles.length) * 0.3}
              >
                <AnimateScrollOut
                  params={fadeOutParams}
                  startProgress={0.3 + (articleIndex / articles.length) * 0.3}
                  stopProgress={0.5 + (articleIndex / articles.length) * 0.3}
                >
                  <Container className="relative flex gap-3 py-12 md:py-24 md:px-5">
                    <DebugGrid />
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
                  </Container>
                </AnimateScrollOut>
              </AnimateScrollIn>
            </ScrollProgressContainer>
          </div>
        ))}
      </div>
    </div>
  )
}
