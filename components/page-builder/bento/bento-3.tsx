import { Icon, IconSymbol } from '@sanity/icons'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { enterSoftBottom } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'

export default function Bento3(props: {
  articles: (KeyedObject & ArticleStub)[]
}) {
  const { articles } = props
  const [first, ...rest] = articles

  return (
    <div className="border-t border-b border-gray-200 dark:border-gray-800">
      <div className="grid divide-y divide-gray-200 dark:divide-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
        <ScrollProgressContainer>
          <AnimateScrollIn
            params={enterSoftBottom}
            startProgress={0.3 + (0 / articles.length) * 0.3}
            stopProgress={0.5 + (0 / articles.length) * 0.3}
          >
            <Container className="relative">
              <DebugGrid />

              <div className="flex flex-col gap-3 py-12 text-left md:justify-center md:py-24">
                {first?.icon ? (
                  <div className="text-4xl">
                    <Icon symbol={first.icon as IconSymbol} />
                  </div>
                ) : null}

                <div className="flex flex-col gap-5">
                  <h2 className="text-2xl font-extrabold font-extrabold leading-tight tracking-tight lg:text-3xl xl:text-5xl">
                    {first.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-200 md:pr-12 md:text-xl">
                    {first.subtitle}
                  </p>
                </div>
              </div>
            </Container>
          </AnimateScrollIn>
        </ScrollProgressContainer>

        <div>
          {rest.map((article, articleIndex) => (
            <div
              key={article._key}
              className={`text-left md:flex-col ${
                articleIndex > 0
                  ? `border-t border-gray-200 dark:border-gray-800`
                  : ``
              }`}
            >
              <ScrollProgressContainer>
                <AnimateScrollIn
                  params={enterSoftBottom}
                  startProgress={
                    0.3 + ((articleIndex + 1) / articles.length) * 0.3
                  }
                  stopProgress={
                    0.5 + ((articleIndex + 1) / articles.length) * 0.3
                  }
                >
                  <Container className="relative">
                    <DebugGrid />

                    <div className="flex flex-col gap-3 py-12 md:py-24">
                      {article?.icon ? (
                        <div className="text-4xl">
                          <Icon symbol={article.icon as IconSymbol} />
                        </div>
                      ) : null}

                      <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl xl:text-5xl">
                          {article.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-200 md:pr-12 md:text-xl">
                          {article.subtitle}
                        </p>
                      </div>
                    </div>
                  </Container>
                </AnimateScrollIn>
              </ScrollProgressContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
