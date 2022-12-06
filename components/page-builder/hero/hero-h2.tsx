import React from 'react'

import Container from '../../container'
import DebugLabel from '../../debug/debug-label'
import Links from '../../links'
import { StyledPortableText } from '../portable-text/StyledPortableText'
import { HeroProps } from '.'

export default function HeroH2(props: HeroProps) {
  const { title, subtitle, content, links } = props

  return (
    <div className="relative">
      <DebugLabel>hero-h2</DebugLabel>

      <Container>
        <div className="flex flex-col items-start gap-4 py-5 md:py-8 md:px-8">
          {subtitle ? (
            <p className="text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-2xl">
              {subtitle}
            </p>
          ) : null}

          {title ? (
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:pr-9 md:text-5xl lg:text-7xl">
              {title}
            </h2>
          ) : null}

          {content?.length > 0 ? (
            <div className="text-2xl">
              <StyledPortableText value={content} />
            </div>
          ) : null}
          {links ? <Links links={links} /> : null}
        </div>
      </Container>
    </div>
  )
}
