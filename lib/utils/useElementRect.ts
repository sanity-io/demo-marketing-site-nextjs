import {useEffect, useState} from 'react'

import {useResize} from './useResize'

export interface ElementRect {
  x: number
  y: number
  width: number
  height: number
}

export function useElementRect(element: Element | null): ElementRect | null {
  const resize = useResize()
  const [rect, setRect] = useState<ElementRect | null>(null)

  useEffect(() => {
    if (!element) return

    const rect$ = resize.observe(element)

    const sub = rect$.subscribe(() => {
      const r = element.getBoundingClientRect()
      const x = r.left
      const y = r.top + window.scrollY

      setRect({
        x,
        y,
        width: r.width,
        height: r.height,
      })
    })

    return () => sub.unsubscribe()
  }, [element, resize])

  return rect
}
