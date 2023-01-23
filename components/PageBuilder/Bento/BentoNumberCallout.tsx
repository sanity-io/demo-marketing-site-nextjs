import React from 'react'

import {ArticleStub} from '../../../types'
import Container from '../../Fix/Container'
import {BentoSubtitle} from './Bento1/BentoSubtitle'
import {BentoSummary} from './Bento1/BentoSummary'

export function isBentoNumberCallout(article: ArticleStub) {
  const title = article.title
  if (!title) {
    return false
  }
  const numbers = title?.replace(/[^0-9]/g, '').length
  const other = title?.replace(/[0-9]/g, '').length
  return numbers >= other
}

export function BentoNumberCallout(props: {article: ArticleStub}) {
  const {article} = props
  return (
    <Container className="relative flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-6 lg:gap-3 lg:py-12 lg:px-5">
        <BentoSubtitle subtitle={article.subtitle} />
        <h2 className="text-6xl font-extrabold leading-tight tracking-tight lg:text-8xl">
          {article.title}
        </h2>
        <BentoSummary summary={article.summary} />
      </div>
    </Container>
  )
}
