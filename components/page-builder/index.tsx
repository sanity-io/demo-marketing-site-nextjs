import React from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import Container from '../container'

type PageBuilderProps = {
  rows: (KeyedObject & TypedObject)[]
}

const ROWS = {
  // Normal rows
  logos: React.lazy(() => import('./logos')),
  quote: React.lazy(() => import('./quote')),
  // Experiment block displays whichever hero was returned in the query
  experiment: React.lazy(() => import('./hero')),
  // Promotion component takes a grouped set of contiguous `promotion` rows
  article: React.lazy(() => import('./article')),
  intermission: React.lazy(() => import('./intermission')),
}

export default function PageBuilder(props: PageBuilderProps) {
  const { rows } = props
  // We scoop all `feature` type blocks into a single block
  // This creates ✨magic✨ layout opportunities
  const rowsGrouped = React.useMemo(
    () =>
      rows.reduce((acc, cur, curIndex, initial) => {
        const prev = acc[acc.length - 1]

        if (cur._type === 'infoBreak') {
          if (prev) {
            prev.breakAfter = true
          }

          // We don't want to render the info break
          return acc
        }

        if (cur._type !== `article`) {
          return [...acc, cur]
        }

        // Is this the first _type of `article`?
        // TODO: This needs to be smarter, an article might not be the first block
        if (curIndex === 0) {
          return [
            ...acc,
            { _key: cur._key, _type: cur._type, isHero: true, articles: [cur] },
          ]
        }

        if (
          // Start a new `articles` array
          !prev ||
          // If the previous block was followed by a `infoBreak` block
          prev.breakAfter ||
          // If the previous group was not a `article` group
          prev._type !== `article` ||
          // Or if the previous `article` group is full
          prev.articles.length === 4 ||
          // Or if the previous `article` group is a hero
          prev.isHero
        ) {
          return [
            ...acc,
            {
              _key: cur._key,
              _type: cur._type,
              articles: [cur],
            },
          ]
        }

        // Add to the existing `articles` array
        return [
          ...acc.slice(0, -1),
          {
            ...prev,
            articles: [...prev.articles, cur],
          },
        ]
      }, []),
    [rows]
  )

  if (!rows?.length || !rowsGrouped.length) {
    return null
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {rowsGrouped.map((row, rowIndex) => {
        if (row._type && ROWS[row._type]) {
          const Row = ROWS[row._type]
          return <Row key={row._key} index={rowIndex} {...row} />
        }
        return (
          <div key={row._key}>
            <Container className="py-5">
              <p className="text-center text-red-500">
                No component found for <code>{row._type}</code>
              </p>
            </Container>
          </div>
        )
      })}
    </div>
  )
}
