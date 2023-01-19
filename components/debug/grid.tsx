import {useMemo} from 'react'
import * as React from 'react'

import {useDebug} from './debug-provider'

export function DebugGrid(props: {columns?: number}) {
  const {grid} = useDebug()

  const columns = useMemo(
    () => Array.from(new Array(props.columns || 5)).map((_, i) => i),
    [props.columns]
  )

  if (!grid) return null

  return (
    <div className="pointer-events-none absolute inset-0 mx-4 flex divide-x divide-blue-400/50 border border-blue-400 opacity-50 sm:mx-5 md:mx-6 lg:mx-7">
      {columns.map((col) => (
        <div className="flex-1" key={col} />
      ))}
    </div>
  )
}
