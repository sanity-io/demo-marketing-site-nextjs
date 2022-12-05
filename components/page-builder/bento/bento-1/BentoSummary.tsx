import { PortableTextBlock } from '@portabletext/types'
import React from 'react'

import { StyledPortableText } from '../../portable-text/StyledPortableText'

export function BentoSummary({ summary }: { summary?: PortableTextBlock[] }) {
  if (!summary?.length) {
    return null
  }

  return (
    <div className="text-2xl text-gray-600 dark:text-gray-200 ">
      <StyledPortableText value={summary} />
    </div>
  )
}
