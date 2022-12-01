import { PortableText } from '@portabletext/react'
import { Icon, IconSymbol } from '@sanity/icons'
import { KeyedObject, TypedObject } from 'sanity'

import { ArticleStub } from '../../types'
import { AnimeScroll } from '../animation/AnimeScroll'
import { enterSoftBottom, popin } from '../animation/scrollAnimations'
import { ScrollProgressContainer } from '../animation/ScrollProgressContainer'
import Container from '../container'
import { DebugGrid } from '../debug/grid'
import Hero from './hero'

type PageBuilderArticleProps = KeyedObject &
  TypedObject & {
    articles: (KeyedObject & ArticleStub)[]
  }

export default function PageBuilderArticle(props: PageBuilderArticleProps) {
  const { isHero, articles } = props

  if (!articles?.length) {
    return null
  } else if (isHero && articles.length === 1) {
    const [article] = articles

    return <Hero {...article} index={0} />
  } else if (articles.length === 1) {
    const [article] = articles

    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <Container>
          <div className="flex flex-col items-start gap-5 py-24 md:items-center md:justify-center">
            {article.subtitle ? (
              <AnimeScroll
                params={popin}
                startProgress={0.2}
                stopProgress={0.5}
              >
                <p className="max-w-xl rounded-full bg-magenta-400 px-5 py-2 text-2xl text-black md:text-center">
                  {article.subtitle}
                </p>
              </AnimeScroll>
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
  } else if (articles.length === 2 || articles.length === 4) {
    return (
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {articles.map((article, articleIndex) => (
            <ScrollProgressContainer key={article._key}>
              <AnimeScroll
                params={enterSoftBottom}
                startProgress={0.3 + (articleIndex / articles.length) * 0.3}
                stopProgress={0.5 + (articleIndex / articles.length) * 0.3}
              >
                <div
                  className={`border-t border-gray-200 text-left dark:border-gray-800 md:w-1/2 md:flex-col ${
                    articleIndex % 2 ? 'md:border-l' : ''
                  }`}
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
                </div>
              </AnimeScroll>
            </ScrollProgressContainer>
          ))}
        </div>
      </div>
    )
  } else if (articles.length === 3) {
    const [first, ...rest] = articles

    return (
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <div className="grid divide-y divide-gray-200 dark:divide-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-b border-gray-200 py-24 dark:border-gray-800">
      {/* <Container className="grid grid-cols-1 gap-y-24 text-center md:grid-cols-3 lg:grid-cols-5"> */}
      {articles.map((article) => (
        <div key={article._key} className="flex flex-col items-center gap-5">
          {article?.icon ? (
            <div className="text-4xl">
              <Icon symbol={article.icon as IconSymbol} />
            </div>
          ) : null}
          <h2 className="px-5 text-xl font-extrabold leading-tight tracking-tight">
            {article.title}
          </h2>
          <p className="px-10 text-xs text-gray-600 dark:text-gray-200">
            {article.subtitle}
          </p>
        </div>
      ))}
      {/* </Container> */}
    </div>
  )
}
