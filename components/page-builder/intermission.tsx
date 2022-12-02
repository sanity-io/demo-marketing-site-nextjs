import { Fragment } from 'react'
import { KeyedObject, TypedObject } from 'sanity'

import Container from '../container'

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
  }

export default function Intermission(props: PageBuilderIntermissionProps) {
  const { statements = [] } = props

  return (
    <div className="border-t border-gray-200 py-5 dark:border-gray-800 sm:py-6 md:py-7">
      <Container>
        <div className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
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
