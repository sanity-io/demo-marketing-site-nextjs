import { m, useTransform } from 'framer-motion'
import React from 'react'

import { useDebug } from '../../../debug/debug-provider'
import {
  ElementScrollStyle,
  useElementScroll,
} from '../../../framer-motion/useElementScroll'

export function HeroSubtitle({ subtitle }: { subtitle?: string }) {
  const { ref, style } = useStyle()
  const { grid } = useDebug()
  if (!subtitle) {
    return null
  }
  return (
    <m.div
      ref={ref}
      style={style}
      className={
        // prettier-ignore
        `my-4 max-w-xl text-base text-magenta-500 ${grid ? `outline` : ``} dark:text-magenta-400 md:static md:-mt-0 md:w-full md:translate-y-0 md:text-2xl`
      }
    >
      {subtitle}
    </m.div>
  )
}

function useStyle(): ElementScrollStyle {
  const {
    ref,
    scroll: { scrollYProgress },
  } = useElementScroll()
  const translateY = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])

  return {
    ref,
    style: {
      translateY,
      opacity,
    },
  }
}
