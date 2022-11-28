import React, { useMemo } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

type PageBuilderProps = {
  rows: (KeyedObject & TypedObject)[]
}

const ROWS = {
  hero: React.lazy(() => import('./hero')),
  experiment: React.lazy(() => import('./hero')),
  // experiment: React.lazy(() => import('./experiment')),
  logos: React.lazy(() => import('./logos')),
  quote: React.lazy(() => import('./quote')),
  feature: React.lazy(() => import('./feature')),
}

export default function PageBuilder(props: PageBuilderProps) {
  const { rows } = props

  // We scoop all `feature` type blocks into a single block
  // This creates ✨magic✨ layout opportunities
  const rowsGrouped = React.useMemo(
    () =>
      rows.reduce((acc, cur) => {
        if (cur._type !== 'feature') {
          return [...acc, cur]
        }

        const prev = acc[acc.length - 1]

        // Start a new `features` array
        if (!prev || prev._type !== `feature`) {
          return [...acc, {
            _key: cur._key,
            _type: cur._type,
            features: [cur]
          }]
        }

        // Add to the existing `features` array
        return [
          ...acc.slice(0, -1),
          {
            ...prev,
            features: [...prev.features, cur]
          }
        ]
      }, []),
    [rows]
  )

  if (!rows?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
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
    </div>
  )
}
