import clsx from 'clsx'
import React, {PropsWithChildren} from 'react'
import {KeyedObject} from 'sanity'

import {ArticleStub} from '../../../types'
import Container from '../../container'
import Bento1 from './bento-1'
import {Small} from './bento-3'
import {BentoNumberCallout, isBentoNumberCallout} from './bento-number-callout'

export default function Bento3Wide(props: {
  articles: (KeyedObject & ArticleStub)[]
  index: number
}) {
  const {articles, index} = props
  const [first, ...rest] = articles
  const even = index % 2 == 0
  const high = <Wide first={first} />
  const cells = (
    <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800 lg:flex-row lg:divide-x lg:divide-y-0">
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
        `flex items-center justify-center text-left md:h-1/2 md:flex-col`,
        articleIndex > 0 &&
          `border-gray-200 dark:border-gray-800 sm:max-md:border-t lg:border-l`
      )}
    >
      <div>{children}</div>
    </Container>
  )
}

function Wide({first}: {first: ArticleStub}) {
  return <Bento1 article={first} index={0} />
}
