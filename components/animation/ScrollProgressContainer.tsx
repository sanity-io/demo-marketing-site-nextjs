import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { DEBUG_ANIMATION } from './debug'
import { useScrollContext } from './ScrollContext'
import { ScrollProgressProvider } from './ScrollProgressContext'

export type ScrollProgressContainerProps = PropsWithChildren<{
  /**
   When scrollWindowSize = 1
   Progress = 0 when the top of the container element is at the bottom of the viewport
   Progress = 1 when the top of the container element is at the top of the viewport

   When scrollWindowSize = 0.5
   Progress = 0 when the top of the container element is at 25% over the bottom of the viewport
   Progress = 1 when the top of the container element is 25% away from the top of the viewport
   */
  scrollWindowSize?: number
}>

export function ScrollProgressContainer({
  scrollWindowSize = 1,
  children,
}: ScrollProgressContainerProps) {
  const ref = useRef<HTMLDivElement>()
  const scrollContext = useScrollContext()
  const [progress, setProgress] = useState(() => ({
    progress: 1,
    height: 0,
    y: 0,
    start: 0,
    stop: 0,
    offset: 0,
    scrollWindow: 0,
  }))
  useEffect(() => {
    if (!scrollContext.height || !ref.current) {
      return
    }
    const rect = ref.current?.getBoundingClientRect()

    const y = rect?.y

    let scrollWindow = scrollContext.height * scrollWindowSize
    const offset = (scrollContext.height - scrollWindow) / 2
    const start = scrollContext.height - offset
    const stop = offset
    scrollWindow = start - stop

    let p = 1 - y / scrollWindow
    p = Math.max(Math.min(p, 1), 0)
    setProgress({
      progress: p,
      height: rect.height,
      y,
      start,
      stop,
      offset,
      scrollWindow,
    })
  }, [scrollContext, scrollWindowSize])

  return (
    <div
      ref={ref}
      className={
        DEBUG_ANIMATION
          ? 'relative border-2 border-dotted border-white'
          : undefined
      }
    >
      {DEBUG_ANIMATION && (
        <div className="z-100 absolute top-1 right-1 flex flex-col gap-1 bg-black p-2">
          <div>Progress: {progress.progress.toFixed(2)}</div>
          <div>Height: {progress.height.toFixed(2)}</div>
          <div>Y: {progress.y.toFixed(2)}</div>
          <div>StartY: {progress.start.toFixed(2)}</div>
          <div>StopY: {progress.stop.toFixed(2)}</div>
          <div>Offset: {progress.offset.toFixed(2)}</div>
          <div>ScrollWindow height: {progress.scrollWindow.toFixed(2)}</div>
        </div>
      )}
      <ScrollProgressProvider value={progress.progress}>
        {children}
      </ScrollProgressProvider>
    </div>
  )
}
