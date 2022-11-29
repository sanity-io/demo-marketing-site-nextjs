import React, { useMemo } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

type PageBuilderProps = {
  rows: (KeyedObject & TypedObject)[]
}

const ROWS = {
  // Normal rows
  hero: React.lazy(() => import('./hero')),
  logos: React.lazy(() => import('./logos')),
  quote: React.lazy(() => import('./quote')),
  // Experiment block displays whichever hero was returned in the query
  experiment: React.lazy(() => import('./hero')),
  // Promotion component takes a grouped set of contiguous `promotion` rows
  promotion: React.lazy(() => import('./promotion')),
}

export default function PageBuilder(props: PageBuilderProps) {
  const { rows } = props

  // We scoop all `feature` type blocks into a single block
  // This creates ✨magic✨ layout opportunities
  const rowsGrouped = React.useMemo(
    () =>
      rows.reduce((acc, cur) => {
        if (cur._type !== `promotion`) {
          return [...acc, cur]
        }

        const prev = acc[acc.length - 1]

        // Start a new `promotions` array
        if (!prev || prev._type !== `promotion`) {
          return [
            ...acc,
            {
              _key: cur._key,
              _type: cur._type,
              promotions: [cur],
            },
          ]
        }

        // Add to the existing `promotions` array
        return [
          ...acc.slice(0, -1),
          {
            ...prev,
            promotions: [...prev.promotions, cur],
          },
        ]
      }, []),
    [rows]
  )

  if (!rows?.length || !rowsGrouped.length) {
    return null
  }

  return (
    <>
      {rowsGrouped.map((row) =>
        row._type && ROWS[row._type] ? (
          React.createElement(ROWS[row._type], {
            ...row,
            key: row._key,
          })
        ) : (
          <p>
            No component found for <code>{row._type}</code>
          </p>
        )
      )}
    </>
  )
}
