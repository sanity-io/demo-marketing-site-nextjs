import clsx from 'clsx'
import React, {PropsWithChildren} from 'react'
import {KeyedObject} from 'sanity'

import {ArticleStub} from '../../../types'
import Container from '../../Fix/Container'
import Bento1 from './Bento1'
import {Small} from './Bento3'
import {BentoNumberCallout, isBentoNumberCallout} from './BentoNumberCallout'

export default function Bento3Wide(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const {articles, index} = props
  const [first, ...rest] = articles
  const even = index % 2 == 0
  const high = <Wide first={first} />
  const cells = (
    <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800 lg:flex-row lg:items-stretch lg:divide-x lg:divide-y-0">
      {rest.map((article, articleIndex) => {
        const Component = isBentoNumberCallout(article)
          ? BentoNumberCallout
          : Small
        return (
          <CellWrapper key={article._key} articleIndex={articleIndex}>
            <Component article={article} />
          </CellWrapper>
        )
      })}
    </div>
  )
  return (
    <div className="max-h-xl">
      {even ? cells : high}
      <div className="border-t border-gray-200 dark:border-gray-800">
        {even ? high : cells}
      </div>
    </div>
  )
}

function CellWrapper({
  articleIndex,
  children,
}: PropsWithChildren<{articleIndex: number}>) {
  return (
    <Container
      className={clsx(
        `flex items-center justify-center text-left lg:flex-col lg:items-start`,
        articleIndex > 0 &&
          `border-gray-200 dark:border-gray-800 sm:max-lg:border-t lg:border-l`
      )}
    >
      {children}
    </Container>
  )
}

function Wide({first}: {first: ArticleStub}) {
  return <Bento1 article={first} index={0} />
}
