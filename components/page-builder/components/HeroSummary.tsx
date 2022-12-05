import { PortableTextBlock } from '@portabletext/types'
import React from 'react'

import { StyledPortableText } from '../portable-text/StyledPortableText'

export function HeroSummary({ summary }: { summary?: PortableTextBlock[] }) {
  if (!summary?.length) {
    return null
  }

  return (
    <div className="max-w-xl text-xl text-gray-700 dark:text-gray-200 md:text-2xl">
      <StyledPortableText value={summary} />
    </div>
  )
}
