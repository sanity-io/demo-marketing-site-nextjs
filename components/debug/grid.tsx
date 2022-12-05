import { useMemo } from 'react'

import { useDebug } from './debug-provider'

export function DebugGrid(props: { columns?: number }) {
  const { grid } = useDebug()

  const columns = useMemo(
    () => Array.from(new Array(props.columns || 1)).map((_, i) => i),
    [props.columns]
  )

  if (!grid) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <div className="relative flex h-full divide-x divide-blue-400/50 border border-blue-400 opacity-50">
        {columns.map((col, colIndex) => (
          <div
            className={`relative flex-1 ${
              colIndex > 1 ? `hidden md:block` : ``
            }`}
            key={col}
          >
            <div className="absolute inset-y-0 left-4 border-l border-magenta-400/50 sm:left-5" />
            <div className="absolute inset-y-0 left-2 border-l border-magenta-400/50" />
            <div className="absolute inset-y-0 right-4 border-l border-magenta-400/50 sm:right-5" />
            <div className="absolute inset-y-0 right-2 border-l border-magenta-400/50" />
          </div>
        ))}
      </div>
    </div>
  )
}
