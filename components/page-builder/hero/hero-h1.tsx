import * as React from 'react'

import Container from '../../container'
import {DebugGrid} from '../../debug/grid'
import Links from '../../links'
import {StyledPortableText} from '../portable-text/StyledPortableText'
import {HeroProps} from '.'

export default function HeroH1(props: HeroProps) {
  const {title, subtitle, content, links} = props

  return (
    <div>
      <Container
        className="sticky top-0 flex flex-col items-center justify-center gap-4 py-5 text-center md:py-8"
        style={{height: '100vh'}}
      >
        <DebugGrid columns={5} />

        {subtitle ? (
          <p className="text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-2xl">
            {subtitle}
          </p>
        ) : null}

        {title ? (
          <div>
            <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
              {title}
            </h1>
          </div>
        ) : null}

        {content?.length > 0 ? (
          <div className="max-w-xl text-2xl">
            <StyledPortableText value={content} />
          </div>
        ) : null}

        {links ? <Links links={links} /> : null}
      </Container>
    </div>
  )
}
