import { Fragment } from 'react'
import { Image, KeyedObject, TypedObject } from 'sanity'

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

export default function Intermission(props: PageBuilderIntermissionProps) {
  const { background, statements = [] } = props

  return (
    <div className="relative border-t border-gray-200 py-5 dark:border-gray-800 sm:py-6 md:py-7">
      <div className="absolute inset-0 opacity-25">
        {background?._type === 'mux.video' && background.asset && (
          <BgVideo asset={background.asset} />
        )}
      </div>

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
  )
}
