import { PropsWithChildren } from 'react'

import { Anime, AnimeProps } from './Anime'
import { useScrollProgress } from './ScrollProgressContext'

export type AnimeScrollProps = PropsWithChildren<
  Omit<AnimeProps, 'progress'>
> & {
  startProgress?: number
  stopProgress?: number
}

export function AnimeScroll(props: AnimeScrollProps) {
  const { startProgress = 0, stopProgress = 1, ...rest } = props
  const progress = useScrollProgress()
  const duration = stopProgress - startProgress
  const scaledProgress = Math.min(
    Math.max((progress - startProgress) / duration, 0),
    1
  )
  return <Anime {...rest} progress={scaledProgress} />
}
