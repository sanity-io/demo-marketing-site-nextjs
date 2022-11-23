// import Link from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { getMarketFromNextLocale } from '../pages'
import Container from './container'
type FooterProps = {
  title: string
}

export default function Footer(props: FooterProps) {
  const { title } = props
  const { domainLocales, locale } = useRouter()

  return (
    <div className="border-t border-gray-100 py-5">
      <Container>
        <div className="flex items-center gap-5 font-bold">
          {title}
          {domainLocales && domainLocales.length > 0 ? (
            <>
              <span>Global Sites:</span>
              {domainLocales.map((domainLocale) => (
                <Link
                  key={domainLocale.domain}
                  href="/"
                  className={
                    domainLocale.locales.includes(locale)
                      ? `opacity-50`
                      : `opacity-100`
                  }
                  locale={domainLocale.defaultLocale}
                >
                  {getMarketFromNextLocale(domainLocale.defaultLocale)}
                </Link>
              ))}
            </>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
