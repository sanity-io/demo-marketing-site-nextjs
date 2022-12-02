import { useEffect, useRef, useState } from 'react'

import { useResize } from './useResize'
import { useScrollY } from './useScrollY'

export interface ElementRect {
  x: number
  y: number
  width: number
  height: number
}

export function useElementRect(element: Element | null): ElementRect | null {
  const resize = useResize()
  const [rect, setRect] = useState<ElementRect | null>(null)
  const scrollY = useScrollY()
  const scrollYRef = useRef(scrollY)

  useEffect(() => {
    scrollYRef.current = scrollY
  }, [scrollY])

  useEffect(() => {
    if (!element) return

    const rect$ = resize.observe(element)

    const sub = rect$.subscribe(() => {
      const r = element.getBoundingClientRect()

      setRect({
        x: r.left,
        y: r.top - scrollYRef.current,
        width: r.width,
        height: r.height,
      })
    })

    return () => sub.unsubscribe()
  }, [element, resize])

  return rect
}
