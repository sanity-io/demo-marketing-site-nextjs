import * as React from 'react'
import {KeyedObject, TypedObject} from 'sanity'

import {ArticleStub} from '../../types'
import BentoResolver from './Bento/BentoResolver'
import Hero from './Hero'

type PageBuilderArticleProps = KeyedObject &
  TypedObject & {
    articles: (KeyedObject & ArticleStub)[]
    index: number
  }

export default function PageBuilderArticle(props: PageBuilderArticleProps) {
  const {isHero, articles = [], index} = props

  if (!articles?.length) {
    return null
  }

  if (isHero && articles.length === 1) {
    const [article] = articles

    return <Hero {...article} />
  }

  return <BentoResolver articles={articles} index={index} />
}
