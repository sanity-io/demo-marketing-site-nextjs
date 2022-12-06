import { PortableTextBlock } from '@portabletext/types'
import React from 'react'

import { StyledPortableText } from '../../portable-text/StyledPortableText'

export function BentoSummary({ summary }: { summary?: PortableTextBlock[] }) {
  // if (!summary?.length) {
  //   return null
  // }

  return (
    <div className="my-4 max-w-xl text-2xl text-gray-600 outline dark:text-gray-300">
      <StyledPortableText value={summary} />
    </div>
  )
}
