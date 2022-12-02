import { AnimeParams } from 'animejs'
import { Fragment, memo } from 'react'
import { Image, KeyedObject, TypedObject } from 'sanity'

import { AnimateScrollIn } from '../animation/AnimateScrollIn'
import { ScrollProgressContainer } from '../animation/ScrollProgressContainer'
import Container from '../container'
import { BgVideo } from '../video/bg-video'
import { SanityMuxVideo } from '../video/types'

interface SanityImage extends Image {
  _type: 'image'
}

type PageBuilderIntermissionProps = KeyedObject &
  TypedObject & {
    _id: string
    title?: string
    statements?: {
      _key: string
      _type: 'block'
      children: {
        _key: string
        _type: 'span'
        text?: string
        marks?: Array<'strong'>
      }[]
    }[]
    background?: SanityMuxVideo | SanityImage
  }

export const fadeInParams: AnimeParams = {
  opacity: [0, 0.25],
  easing: 'easeOutSine',
}

const Intermission = memo(function Intermission(
  props: PageBuilderIntermissionProps
) {
  const { background, statements = [] } = props

  return (
    <ScrollProgressContainer className="relative">
      <div
        className="border-t border-gray-200 py-5 dark:border-gray-800 sm:py-6 md:py-7"
        style={{ height: '150vh', padding: '25vh 0' }}
      >
        <AnimateScrollIn className="absolute inset-0" params={fadeInParams}>
          <div className="sticky top-0 h-screen">
            {background?._type === 'mux.video' && background.asset && (
              <BgVideo asset={background.asset} />
            )}
          </div>
        </AnimateScrollIn>

        <Container>
          <div className="relative text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            {statements.map((statement) => (
              <span
                className="text-gray-300 hover:text-black dark:text-gray-600 hover:dark:text-white"
                key={statement._key}
              >
                {statement.children.map((n) => {
                  let node = <>{n}</>

                  if (n.marks.includes('strong')) {
                    node = <strong className="font-extrabold">{node}</strong>
                  }

                  return <Fragment key={n._key}>{n.text}</Fragment>
                })}{' '}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </ScrollProgressContainer>
  )
})

export default Intermission
