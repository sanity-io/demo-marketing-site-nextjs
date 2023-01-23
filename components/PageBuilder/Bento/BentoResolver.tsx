import {Icon, IconSymbol} from '@sanity/icons'
import React from 'react'
import {KeyedObject} from 'sanity'

import {ArticleStub} from '../../../types'
import Bento1 from './Bento1'
import Bento3 from './Bento3'
import Bento3Wide from './Bento3Wide'
import BentoEven from './BentoEven'

export interface BentoBoxProps {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}

export default function BentoResolver(props: BentoBoxProps) {
  const {articles, index} = props

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

  return (
    <div className="py-24">
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
    </div>
  )
}
