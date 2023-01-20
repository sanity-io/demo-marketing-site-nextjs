import {PortableText, PortableTextProps} from '@portabletext/react'
import {PortableTextBlock, TypedObject} from '@portabletext/types'
import * as React from 'react'

export function StyledPortableText<B extends TypedObject = PortableTextBlock>({
  value,
}: PortableTextProps<B>) {
  return (
    <div className="[&_strong]:text-magenta-500 [&_strong]:dark:text-magenta-400">
      <PortableText value={value} />
    </div>
  )
}
