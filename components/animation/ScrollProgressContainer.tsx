import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useElementRect } from '../../lib/utils/useElementRect'
import { useViewport } from '../../lib/utils/useViewport'
import { useDebug } from '../debug/debug-provider'
import { ScrollProgress, ScrollProgressProvider } from './ScrollProgressContext'

export type ScrollProgressContainerProps = PropsWithChildren<{
  className?: string

  /**
   * When scrollWindowSize = 1
   * Progress = 0 when the top of the container element is at the bottom of the viewport
   * Progress = 1 when the top of the container element is at the top of the viewport
   *
   * When scrollWindowSize = 0.5
   * Progress = 0 when the top of the container element is at 25% over the bottom of the viewport
   * Progress = 1 when the top of the container element is 25% away from the top of the viewport
   */
  scrollWindowSize?: number
}>

const DEBUG_STYLE: CSSProperties = {
  outline: `4px dotted green`,
  outlineOffset: '-2px',
}

export function ScrollProgressContainer({
  scrollWindowSize = 1,
  children,
  className,
}: ScrollProgressContainerProps) {
  const [element, setElement] = useState<HTMLDivElement>(null)

  const { animation: DEBUG_ANIMATION } = useDebug()
  const viewport = useViewport()
  const rect = useElementRect(element)
  const rectH = rect?.height
  const rectY = rect?.y

  const [progress, setProgress] = useState<ScrollProgress>({ in: 0, out: 0 })

  const debugRef = useRef({
    topY: 0,
    bottomY: 0,
    height: 0,
    start: 0,
    stop: 0,
    offset: 0,
    scrollWindow: 0,
  })

  useEffect(() => {
    if (rectH === undefined) return
    if (rectY === undefined) return
    if (!viewport.height) return

    let scrollWindow = viewport.height * scrollWindowSize

    const offset = (viewport.height - scrollWindow) / 2
    const start = viewport.height - offset
    const stop = offset

    scrollWindow = start - stop

    const topY = rectY - window.scrollY
    const bottomY = topY + rectH

    // `in` progress
    let inProgress = 1 - topY / scrollWindow
    inProgress = Math.max(Math.min(inProgress, 1), 0)

    // `out` progress
    let outProgress = 1 - bottomY / scrollWindow
    outProgress = Math.max(Math.min(outProgress, 1), 0)

    debugRef.current = {
      topY,
      bottomY,
      height: rectH,
      start,
      stop,
      offset,
      scrollWindow,
    }

    setProgress({
      in: inProgress,
      out: outProgress,
    })
  }, [element, rectH, rectY, scrollWindowSize, viewport.height])

  return (
    <div
      ref={setElement}
      className={`${className ?? ''} relative`}
      style={DEBUG_ANIMATION ? DEBUG_STYLE : undefined}
    >
      {DEBUG_ANIMATION && (
        <div className="z-100 absolute top-0 right-0 bottom-0">
          <div className="sticky top-1 right-0 p-7">
            <div className="flex flex-col bg-white text-sm dark:bg-black">
              <code>progress.in: {progress.in.toFixed(2)}</code>
              <code>progress.out: {progress.out.toFixed(2)}</code>
              {/* <code>scrollY: {scrollY.toFixed(2)}</code>
              <code>height: {debugRef.current.height.toFixed(2)}</code>
              <code>topY: {debugRef.current.topY}</code>
              <code>bottomY: {debugRef.current.bottomY}</code>
              <code>startY: {debugRef.current.start.toFixed(2)}</code>
              <code>stopY: {debugRef.current.stop.toFixed(2)}</code>
              <code>offset: {debugRef.current.offset.toFixed(2)}</code>
              <code>
                scrollHeight: {debugRef.current.scrollWindow.toFixed(2)}
              </code>*/}
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
