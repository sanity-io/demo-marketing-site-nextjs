import {
  PortableText,
  PortableTextProps,
  PortableTextReactComponents,
} from '@portabletext/react'
import { PortableTextBlock, TypedObject } from '@portabletext/types'

const components: Partial<PortableTextReactComponents> = {
  marks: {
    strong: ({ children }) => (
      <strong className="text-magenta-500 dark:text-magenta-400">
        {children}
      </strong>
    ),
  },
}

export function StyledPortableText<B extends TypedObject = PortableTextBlock>({
  value,
}: PortableTextProps<B>) {
  return <PortableText value={value} components={components} />
}
