import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useElementRect } from '../../lib/utils/useElementRect'
import { useScrollY } from '../../lib/utils/useScrollY'
import { useViewport } from '../../lib/utils/useViewport'
import { DEBUG_ANIMATION } from './debug'
import { ScrollProgress, ScrollProgressProvider } from './ScrollProgressContext'

// export interface ScrollProgress {
//   progress: number
//   height: number
//   y: number
//   start: number
//   stop: number
//   offset: number
//   scrollWindow: number
// }

export type ScrollProgressContainerProps = PropsWithChildren<{
  className?: string

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
  className,
}: ScrollProgressContainerProps) {
  const [element, setElement] = useState<HTMLDivElement>(null)

  const viewport = useViewport()
  const rect = useElementRect(element)
  const rectHeight = rect?.height
  const rectY = rect?.y
  const scrollY = useScrollY()

  // const [progress, setProgress] = useState<ScrollProgress>(() => ({
  //   progress: 1,
  //   height: 0,
  //   y: 0,
  //   start: 0,
  //   stop: 0,
  //   offset: 0,
  //   scrollWindow: 0,
  // }))

  const [progress, setProgress] = useState<ScrollProgress>({ in: 0, out: 0 })

  const debugRef = useRef({ topY: 0, bottomY: 0 })

  useEffect(() => {
    if (rectHeight === undefined || rectY === undefined) return

    if (!viewport.height) return

    let scrollWindow = viewport.height * scrollWindowSize

    const offset = (viewport.height - scrollWindow) / 2
    const start = viewport.height - offset
    const stop = offset

    scrollWindow = start - stop

    const topY = rectY - scrollY
    const bottomY = topY + rectHeight

    console.log('topY', topY)
    console.log('bottomY', bottomY)

    // `in` progress
    let inProgress = 1 - topY / scrollWindow
    inProgress = Math.max(Math.min(inProgress, 1), 0)

    // `out` progress
    let outProgress = 1 - bottomY / scrollWindow
    outProgress = Math.max(Math.min(outProgress, 1), 0)

    debugRef.current = { topY, bottomY }

    // const nextProgress: ScrollProgress = {
    //   progress: p,
    //   height: rectHeight,
    //   y,
    //   start,
    //   stop,
    //   offset,
    //   scrollWindow,
    // }

    setProgress({ in: inProgress, out: outProgress })
  }, [viewport.height, scrollWindowSize, rectY, rectHeight, scrollY])

  return (
    <div
      ref={setElement}
      className={
        DEBUG_ANIMATION
          ? `${className ?? ''} relative border-2 border-dotted border-red-500`
          : `${className ?? ''} relative`
      }
    >
      {DEBUG_ANIMATION && (
        <div className="z-100 absolute top-0 right-0 bottom-0">
          <div className="sticky top-0 p-7">
            <div className="bg-black">
              {/* <div>Progress: {progress.progress.toFixed(2)}</div>
              <div>Height: {progress.height.toFixed(2)}</div>
              <div>Y: {progress.y.toFixed(2)}</div>
              <div>StartY: {progress.start.toFixed(2)}</div>
              <div>StopY: {progress.stop.toFixed(2)}</div>
              <div>Offset: {progress.offset.toFixed(2)}</div>
              <div>ScrollWindow height: {progress.scrollWindow.toFixed(2)}</div> */}
              <div>progress.in: {progress.in.toFixed(2)}</div>
              <div>progress.out: {progress.out.toFixed(2)}</div>
              <div>topY: {debugRef.current.topY}</div>
              <div>bottomY: {debugRef.current.bottomY}</div>
            </div>
          </div>
        </div>
      )}

      <ScrollProgressProvider value={progress}>
        {children}
      </ScrollProgressProvider>
    </div>
  )
}
