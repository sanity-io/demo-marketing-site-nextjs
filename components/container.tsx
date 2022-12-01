import { PropsWithChildren } from 'react'

import { useDebug } from './debug/debug-provider'

type ContainerProps = PropsWithChildren<{ className?: string }>

export default function Container(props: ContainerProps) {
  const { className, children } = props
  const { grid } = useDebug()

  return (
    <div
      className={
        // prettier-ignore
        `w-full mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-7 ${className ?? ``} ${grid ? `bg-purple-50 dark:bg-purple-950` : ``}`
      }
    >
      {children}
    </div>
  )
}
