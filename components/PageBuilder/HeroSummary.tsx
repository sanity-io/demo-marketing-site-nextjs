import {PortableTextBlock} from '@portabletext/types'
import React from 'react'

import {StyledPortableText} from './PortableText/StyledPortableText'

export function HeroSummary({summary}: {summary?: PortableTextBlock[]}) {
  if (!summary?.length) {
    return null
  }

  return (
    <div className="max-w-xl text-xl text-gray-700 md:text-2xl dark:text-gray-200">
      <StyledPortableText value={summary} />
    </div>
  )
}
