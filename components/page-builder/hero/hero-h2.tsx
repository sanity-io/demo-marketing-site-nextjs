import { PortableText } from '@portabletext/react'
import React from 'react'

import Container from '../../container'
import Links from '../../links'
import { HeroProps } from '.'

export default function HeroH2(props: HeroProps) {
  const { title, subtitle, content, links } = props

  return (
    <Container>
      <div className="flex flex-col items-start gap-4 py-5 md:py-8 md:px-8">
        {subtitle ? (
          <p className="text-lg text-theme md:w-full md:text-2xl">{subtitle}</p>
        ) : null}
        {title ? (
          <h2 className="text-4xl font-bold leading-none tracking-tighter md:pr-9 md:text-5xl lg:text-7xl">
            {title}
          </h2>
        ) : null}
        {content?.length > 0 ? (
          <div className="text-2xl">
            <PortableText value={content} />
          </div>
        ) : null}
        {links ? <Links links={links} /> : null}
      </div>
    </Container>
  )
}
