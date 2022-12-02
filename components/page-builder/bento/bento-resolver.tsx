import { Icon, IconSymbol } from '@sanity/icons'
import { KeyedObject } from 'sanity'

import { ArticleStub } from '../../../types'
import { AnimateScrollIn } from '../../animation/AnimateScrollIn'
import { inSoftBottom, popin } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import Bento1 from './bento-1'
import Bento3 from './bento-3'
import BentoEven from './bento-even'

export interface BentoBoxProps {
  articles: (KeyedObject & ArticleStub)[]
}

export default function BentoResolver(props: BentoBoxProps) {
  const { articles } = props

  if (articles.length === 1) {
    return <Bento1 article={articles[0]} />
  } else if (articles.length === 2 || articles.length === 4) {
    return <BentoEven articles={articles} />
  } else if (articles.length === 3) {
    return <Bento3 articles={articles} />
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
