import { m, useScroll, useTransform } from 'framer-motion'
import { Fragment, memo, useRef } from 'react'
import { Image, KeyedObject, TypedObject } from 'sanity'

import Container from '../container'
import { BgVideo } from '../video/bg-video'
import { SanityMuxVideo } from '../video/types'

interface SanityImage extends Image {
  _type: 'image'
}

interface TextSpan {
  _key: string
  _type: 'span'
  text?: string
  marks?: Array<'strong'>
}

interface TextStatement {
  _key: string
  _type: 'block'
  children: TextSpan[]
}

type PageBuilderIntermissionProps = KeyedObject &
  TypedObject & {
    _id: string
    title?: string
    statements?: TextStatement[]
    background?: SanityMuxVideo | SanityImage
  }

const Intermission = memo(function Intermission(
  props: PageBuilderIntermissionProps
) {
  const { background, statements = [] } = props

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div
      className="relative border-t border-gray-200 py-5 dark:border-gray-800 sm:py-6 md:py-7"
      style={{ minHeight: '150vh', padding: '25vh 0' }}
    >
      <m.div className="absolute inset-0" ref={ref} style={{ opacity }}>
        <div className="sticky top-0 h-screen">
          {background?._type === 'mux.video' && background.asset && (
            <BgVideo asset={background.asset} />
          )}
        </div>
      </m.div>

      <Container>
        <div className="relative text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          {statements.map((statement) => (
            <Fragment key={statement._key}>
              <Statement statement={statement} />{' '}
            </Fragment>
          ))}
        </div>
      </Container>
    </div>
  )
})

function Statement({ statement }: { statement: TextStatement }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const opacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    [0.1, 1, 1, 0.1]
  )

  return (
    <m.span
      className="text-white"
      key={statement._key}
      style={{ opacity }}
      ref={ref}
    >
      {statement.children.map((n) => {
        return <Span key={n._key} span={n} />
      })}
    </m.span>
  )
}

function Span({ span }: { span: TextSpan }) {
  if (span.marks.includes('strong')) {
    return (
      <strong className="font-extrabold text-magenta-500 dark:text-magenta-400">
        {span.text}
      </strong>
    )
  }
  return <Fragment>{span.text}</Fragment>
}

export default Intermission
