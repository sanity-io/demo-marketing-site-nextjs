import { m, MotionValue, useScroll, useTransform } from 'framer-motion'
import NextImage from 'next/image'
import React, { Fragment, memo, useRef } from 'react'
import { Image, KeyedObject, TypedObject } from 'sanity'

import { urlForImage } from '../../sanity/sanity'
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
      className="relative py-5 sm:py-6 md:py-7"
      style={{ minHeight: '150vh', padding: '25vh 0' }}
    >
      <m.div className="absolute inset-0" ref={ref} style={{ opacity }}>
        <div className="sticky top-0 h-screen">
          {background?._type === 'mux.video' && background.asset && (
            <BgVideo asset={background.asset} />
          )}
          {background?._type === 'image' && (
            <NextImage
              src={urlForImage(background).width(2048).height(2048).url()}
              width={2048}
              height={2048}
              alt={''}
              className="h-full w-full object-cover opacity-50"
            />
          )}
        </div>
      </m.div>

      <Container>
        <Statements statements={statements} />
      </Container>
    </div>
  )
})

function Statements({ statements }: { statements: TextStatement[] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div
      className="relative mx-auto max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl"
      ref={ref}
    >
      {statements.map((statement, i) => (
        <Fragment key={statement._key}>
          <Statement
            statement={statement}
            scrollYProgress={scrollYProgress}
            statements={statements.length}
            index={i}
          />
          {/* intentional space */}{' '}
        </Fragment>
      ))}
    </div>
  )
}

function Statement({
  statement,
  index,
  statements,
  scrollYProgress,
}: {
  statement: TextStatement
  index: number
  statements: number
  scrollYProgress: MotionValue<number>
}) {
  const ref = useRef(null)
  const range = 0.5
  const highlightRange = range / statements
  const fadeRange = 0.01
  const highlightStart = 0.3
  const highlightEnd = highlightStart + highlightRange
  const offset = (index / statements) * range
  const opacity = useTransform(
    scrollYProgress,
    [
      highlightStart - fadeRange * 2,
      highlightStart,
      highlightStart + fadeRange,
      highlightEnd - fadeRange,
      highlightEnd,
      highlightEnd + fadeRange * 2,
    ].map((v) => v + offset),
    [0.15, 0.5, 1, 1, 0.5, 0.15]
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
