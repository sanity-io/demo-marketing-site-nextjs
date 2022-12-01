import { PortableText } from '@portabletext/react'
import { Star } from 'lucide-react'
import { KeyedObject, TypedObject } from 'sanity'

import { ArticleStub } from '../../types'
import Container from '../container'
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
      <div className="border-t border-b border-gray-200">
        <Container>
          <div className="flex flex-col items-start gap-5 py-24 md:items-center md:justify-center">
            {article.subtitle ? (
              <p className="max-w-xl rounded-full bg-theme px-5 py-2 text-2xl text-black md:text-center">
                {article.subtitle}
              </p>
            ) : null}
            {article?.title ? (
              <h2 className="text-5xl font-bold leading-tight tracking-tighter md:text-center md:text-7xl">
                {article.title}
              </h2>
            ) : null}
            {article?.summary?.length > 0 ? (
              <div className="max-w-xl text-2xl text-gray-600 md:text-center">
                <PortableText value={article.summary} />
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    )
  } else if (articles.length === 2 || articles.length === 4) {
    return (
      <div className="border-t border-b border-gray-200">
        <Container className="flex flex-col md:flex-row md:flex-wrap">
          {articles.map((article, articleIndex) => (
            <div
              key={article._key}
              className={`flex gap-5 py-12 text-left md:w-1/2 md:flex-col md:py-24 md:px-5 ${
                articleIndex > 1 ? `border-t` : ``
              }`}
            >
              <Star className="h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col gap-5">
                <h2 className="text-xl font-bold leading-tight tracking-tighter">
                  {article.title}
                </h2>
                <p className="text-gray-600 md:pr-12">{article.subtitle}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    )
  } else if (articles.length === 3) {
    const [first, ...rest] = articles

    return (
      <div className="border-t border-b border-gray-200">
        <Container className="grid md:grid-cols-2">
          <div className="-mx-5 flex justify-center gap-5 bg-gray-100 py-12 px-5 text-left md:mx-0 md:flex-col md:py-24 md:px-5">
            <Star className="h-5 w-5 flex-shrink-0" />
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl">
                {first.title}
              </h2>
              <p className="text-gray-600 md:pr-12 md:text-xl">
                {first.subtitle}
              </p>
            </div>
          </div>
          <div>
            {rest.map((article, articleIndex) => (
              <div
                key={article._key}
                className={`flex gap-5 py-12 text-left md:flex-col md:py-24 md:px-5 ${
                  articleIndex > 0 ? `border-t` : ``
                }`}
              >
                <Star className="h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-bold leading-tight tracking-tighter">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 md:pr-12">{article.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="border-t border-b border-gray-200 py-24">
      <Container className="grid grid-cols-1 gap-y-24 text-center md:grid-cols-3 lg:grid-cols-5">
        {articles.map((article) => (
          <div key={article._key} className="flex flex-col items-center gap-5">
            <Star />
            <h2 className="px-5 text-xl font-bold leading-tight tracking-tighter">
              {article.title}
            </h2>
            <p className="px-10 text-xs text-gray-600">{article.subtitle}</p>
          </div>
        ))}
      </Container>
    </div>
  )
}
