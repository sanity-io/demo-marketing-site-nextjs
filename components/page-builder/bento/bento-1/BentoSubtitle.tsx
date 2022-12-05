import { m } from 'framer-motion'
import React from 'react'

export function BentoSubtitle({
  subtitle,
  type = 'plain',
}: {
  subtitle?: string
  type?: 'pill' | 'plain'
}) {
  if (!subtitle) {
    return null
  }

  const Component = type === 'plain' ? Plain : Pill
  return (
    <div className="py-2">
      <Component subtitle={subtitle} />
    </div>
  )
}

function Pill({ subtitle }: { subtitle: string }) {
  return (
    <m.div
      initial={{
        scale: 0,
      }}
      whileInView={{
        scale: 1,
      }}
      viewport={{
        amount: 'all',
        margin: '100px',
      }}
      transition={{ type: 'spring' }}
      className={
        'max-w-xl rounded-full bg-magenta-400 px-5 py-2 text-2xl text-black'
      }
    >
      {subtitle}
    </m.div>
  )
}

function Plain({ subtitle }: { subtitle: string }) {
  return (
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
      transition={{ duration: 2 }}
      className={
        'max-w-xl rounded-full text-2xl text-magenta-500 dark:text-magenta-400'
      }
    >
      {subtitle}
    </m.div>
  )
}
