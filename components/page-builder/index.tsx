import React from 'react'
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
}

export default function PageBuilder(props: PageBuilderProps) {
  const { rows } = props

  if (!rows?.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      {rows.map((row) =>
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
