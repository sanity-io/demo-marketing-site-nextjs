import { HTMLProps } from 'react'

import { useDebug } from './debug/debug-provider'

export default function Container(props: HTMLProps<HTMLDivElement>) {
  const { className, children, ...restProps } = props
  const { grid } = useDebug()

  return (
    <div
      {...restProps}
      className={
        // prettier-ignore
        `${className ?? ``} w-full mx-auto max-w-7xl sm:px-3 md:px-5 lg:px-7 ${grid ? `bg-purple-50 dark:bg-purple-950` : ``}`
      }
    >
      {children}
    </div>
  )
}
