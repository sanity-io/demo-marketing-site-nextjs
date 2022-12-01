import { PortableText } from '@portabletext/react'

import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import Links from '../../links'
import { HeroProps } from '.'

export default function HeroH1(props: HeroProps) {
  const { title, subtitle, content, links } = props

  return (
    <Container className="relative flex flex-col items-center gap-4 py-5 text-center md:py-8">
      <DebugGrid columns={5} />

      {subtitle ? (
        <p className="text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-2xl">
          {subtitle}
        </p>
      ) : null}

      {title ? (
        <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
          {title}
        </h1>
      ) : null}

      {content?.length > 0 ? (
        <div className="max-w-xl text-2xl">
          <PortableText value={content} />
        </div>
      ) : null}

      {links ? <Links links={links} /> : null}
    </Container>
  )
}
