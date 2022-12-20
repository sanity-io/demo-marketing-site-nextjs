import {m} from 'framer-motion'
import React from 'react'

export function BentoSubtitle({
  subtitle,
  className,
}: {
  subtitle?: string
  className?: string
}) {
  if (!subtitle) {
    return null
  }

  return (
    <div className={className ?? 'py-2'}>
      <m.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          amount: 'all',
          margin: '100px',
        }}
        transition={{duration: 1}}
        className={
          'max-w-xl rounded-full text-2xl text-magenta-500 dark:text-magenta-400'
        }
      >
        {subtitle}
      </m.div>
    </div>
  )
}
