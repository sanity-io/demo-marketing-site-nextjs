import Link from 'next/link'
import React from 'react'

import {PageProps} from '../types'
import Container from './Container'
import PageBuilder from './PageBuilder'

export default function Page(props: PageProps) {
  const {slug, market, translations, content} = props

  return (
    <article className="flex flex-col">
      <Container>
      {translations.length > 1 ? (
        <ul className="flex items-center justify-end gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
          {translations
            .filter((i) => i)
            .map((translation) => {
              return (
                <li
                  key={translation.slug}
                  className={
                    translation.slug === slug ? `opacity-50` : undefined
                  }
                >
                  <Link
                    href={`/${translation.slug}`}
                    locale={[translation.language, market].join(`-`)}
                  >
                    {translation.title}{' '}
                    <span className="inline-block -translate-y-0.5 text-xs tracking-tight">
                      ({translation.language.toUpperCase()})
                    </span>
                  </Link>
                </li>
              )
            })}
        </ul>
      ) : null}
      </Container>
      {content && content.length > 0 ? <PageBuilder rows={content} /> : null}
    </article>
  )
}
