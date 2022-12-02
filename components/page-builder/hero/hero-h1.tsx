import { PortableText } from '@portabletext/react'
import { AnimeParams } from 'animejs'

import { AnimateScrollOut } from '../../animation/AnimateScrollOut'
import { Anime } from '../../animation/Anime'
import { float } from '../../animation/scrollAnimations'
import { ScrollProgressContainer } from '../../animation/ScrollProgressContainer'
import Container from '../../container'
import { DebugGrid } from '../../debug/grid'
import Links from '../../links'
import { HeroProps } from '.'

export const fadeOutParams: AnimeParams = {
  opacity: [1, 0],
  easing: 'easeOutSine',
}

export default function HeroH1(props: HeroProps) {
  const { title, subtitle, content, links } = props

  return (
    <ScrollProgressContainer>
      <div style={{ height: '100vh' }}>
        <div className="sticky top-0">
          <Container className="relative flex flex-col items-center gap-4 py-5 text-center md:py-8">
            <DebugGrid columns={5} />

            {subtitle ? (
              <p className="text-lg text-magenta-500 dark:text-magenta-400 md:w-full md:text-2xl">
                {subtitle}
              </p>
            ) : null}

            {title ? (
              <div className={'h-30 overflow-hidden'}>
                <AnimateScrollOut params={fadeOutParams}>
                  <Anime params={float} autoplay>
                    <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl">
                      {title}
                    </h1>
                  </Anime>
                </AnimateScrollOut>
              </div>
            ) : null}

            {content?.length > 0 ? (
              <div className="max-w-xl text-2xl">
                <PortableText value={content} />
              </div>
            ) : null}

            {links ? <Links links={links} /> : null}
          </Container>
        </div>
      </div>
    </ScrollProgressContainer>
  )
}
