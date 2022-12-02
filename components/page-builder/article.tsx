import { KeyedObject, TypedObject } from 'sanity'

import { ArticleStub } from '../../types'
import BentoResolver from './bento/bento-resolver'
import Hero from './hero'

type PageBuilderArticleProps = KeyedObject &
  TypedObject & {
    articles: (KeyedObject & ArticleStub)[]
  }

export default function PageBuilderArticle(props: PageBuilderArticleProps) {
  const { isHero, articles } = props

  if (!articles?.length) {
    return null
  }

  if (isHero && articles.length === 1) {
    const [article] = articles

    return <Hero {...article} index={0} />
  }

  return <BentoResolver articles={articles} />
}
