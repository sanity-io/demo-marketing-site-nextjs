import { Icon } from '@sanity/icons'

import Container from '../../container'
import DebugLabel from '../../debug/debug-label'
import { useDebug } from '../../debug/debug-provider'
import { DebugGrid } from '../../debug/grid'
import Links from '../../links'
import { StyledPortableText } from '../portable-text/StyledPortableText'
import { HeroProps } from '.'

export default function HeroH1(props: HeroProps) {
  const { icon, title, subtitle } = props
  const { grid } = useDebug()
  const links = props.links || []
  const summary = props.summary || []

  return (
    <div
      className="relative"
      style={{
        height: '100vh',
        // height: '150vh',
      }}
    >
      <DebugLabel>hero-h1</DebugLabel>

      <Container
        className="sticky top-0 flex flex-col items-center justify-center py-5 text-center md:py-8"
        style={{ minHeight: '100vh' }}
      >
        <DebugGrid columns={5} />

        <div className="text-container w-full">
          {icon && (
            <div className="mx-auto text-center text-4xl md:text-8xl">
              <Icon className="inline-block" symbol={icon} />
            </div>
          )}

          {subtitle && (
            <p
              className={
                // prettier-ignore
                `my-4 text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-xl lg:text-2xl ${grid ? `outline` : ``}`
              }
            >
              {subtitle}
            </p>
          )}

          {title && (
            <h1
              className={
                // prettier-ignore
                `my-4 text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:mb-5 md:text-7xl lg:mb-6 lg:text-8xl xl:text-9xl ${grid ? `outline` : ``}`
              }
            >
              {title}
            </h1>
          )}

          {summary.length > 0 && (
            <div
              className={
                // prettier-ignore
                `mx-auto my-4 max-w-xl text-lg text-gray-700 dark:text-gray-400 md:text-xl lg:text-2xl ${grid ? `outline` : ``}`
              }
            >
              <StyledPortableText value={summary} />
            </div>
          )}

          {links.length > 0 && (
            <div
              className={`mx-auto my-5 text-center ${grid ? `outline` : ``}`}
            >
              <div className="inline-block">
                <Links links={links} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
