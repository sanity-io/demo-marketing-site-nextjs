import { ReactNode } from 'react'

import { useDebug } from './debug-provider'

export default function DebugLabel(props: { children?: ReactNode }) {
  const { children } = props
  const { label } = useDebug()

  if (!label) return null

  return (
    <div className="pointer-events-none absolute z-50 p-3 text-xs font-bold uppercase leading-none text-magenta-400">
      {children}
    </div>
  )
}
