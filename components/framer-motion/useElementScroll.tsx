import { MotionStyle, useScroll } from 'framer-motion'
import React, { useRef } from 'react'

export interface ElementScrollStyle {
  ref: React.MutableRefObject<any>
  style: MotionStyle
}

/**
 * Put ref on m.element
 */
export function useElementScroll() {
  const ref = useRef(null)
  const scroll = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  return {
    ref,
    scroll,
  }
}
