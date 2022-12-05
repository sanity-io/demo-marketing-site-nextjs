import { PortableTextBlock } from '@portabletext/types'
import React from 'react'

import { useDebug } from '../../../debug/debug-provider'
import { StyledPortableText } from '../../portable-text/StyledPortableText'

export function HeroSummary({ summary }: { summary?: PortableTextBlock[] }) {
  const { grid } = useDebug()

  if (!summary?.length) {
    return null
  }

  return (
    <div
      className={
        // prettier-ignore
        `my-5 max-w-xl text-xl text-gray-700 ${grid ? `outline` : ``} dark:text-gray-300 md:text-2xl`
      }
    >
      <StyledPortableText value={summary} />
    </div>
  )
}
