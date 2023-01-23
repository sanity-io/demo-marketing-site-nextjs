import Link from 'next/link'
import React from 'react'

import {PageProps} from '../types'
import PageBuilder from './PageBuilder'

export default function Page(props: PageProps) {
  const {slug, market, translations, content} = props

  return (
    <article className="flex flex-col">
      {translations.length > 0 ? (
        <ul className="flex items-center gap-4">
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
      {content && content.length > 0 ? <PageBuilder rows={content} /> : null}
    </article>
  )
}
