import { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{ className?: string }>

export default function Container(props: ContainerProps) {
  const { className, children } = props

  return (
    <div className={`container mx-auto px-5 md:px-10 ${className ?? ``}`}>
      {children}
    </div>
  )
}
