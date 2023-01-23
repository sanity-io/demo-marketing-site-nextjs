import clsx from 'clsx'
import {HTMLProps} from 'react'
import * as React from 'react'

import {useDebug} from '../Debug/DebugProvider'

export default function Container(props: HTMLProps<HTMLDivElement>) {
  const {className, children, ...restProps} = props
  const {grid} = useDebug()

  return (
    <div
      {...restProps}
      className={clsx(
        className ?? ``,
        `mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-7`,
        grid && `bg-purple-50 dark:bg-purple-950`
      )}
    >
      {children}
    </div>
  )
}
