import {domAnimation, LazyMotion} from 'framer-motion'
import Link from 'next/link'
import {useState} from 'react'
import * as React from 'react'

import PageBuilder from '../components/page-builder'
import {ResizeProvider} from '../lib/utils/ResizeProvider'
import {ScrollYProvider} from '../lib/utils/ScrollYProvider'
import {ViewportProvider} from '../lib/utils/ViewportProvider'
import {PageProps} from '../types'

export default function Page(props: PageProps) {
  const {slug, market, translations, content} = props
  const [element, setElement] = useState<HTMLElement | null>(null)

  // FIXME: translations array, if set, can have a null element as the first
  // member. Find out why and eliminate it.

  return (
    <LazyMotion features={domAnimation}>
      <ViewportProvider>
        <ScrollYProvider>
          <ResizeProvider rootElement={element}>
            <article className="flex flex-col" ref={setElement}>
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
              {content && content.length > 0 ? (
                <PageBuilder rows={content} />
              ) : null}
            </article>
          </ResizeProvider>
        </ScrollYProvider>
      </ViewportProvider>
    </LazyMotion>
  )
}
