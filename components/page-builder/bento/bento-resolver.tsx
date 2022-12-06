import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import Bento1 from './bento-1'
import Bento3 from './bento-3'
import Bento3Wide from './bento-3-wide'
import BentoEven from './bento-even'

export interface BentoBoxProps {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}

export default function BentoResolver(props: BentoBoxProps) {
  const { articles, index } = props

  if (articles.length === 1) {
    return <Bento1 article={articles[0]} index={index} />
  } else if (articles.length === 2 || articles.length === 4) {
    return <BentoEven articles={articles} />
  } else if (articles.length === 3) {
    return index % 2 === 0 ? (
      <Bento3 articles={articles} index={index} />
    ) : (
      <Bento3Wide articles={articles} index={index} />
    )
  }

  return <BentoEven articles={articles} />
}
