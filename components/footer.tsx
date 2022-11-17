// import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import Container from './container'

export default function Footer() {
  const { domainLocales } = useRouter()

  return (
    <div className="border-t border-gray-100 py-5">
      <Container>
        <div className="flex items-center gap-5">
          {domainLocales && domainLocales.length > 0 ? (
            <>
              <span>Global Sites:</span>
              {domainLocales.map((locale) => (
                <a
                  key={locale.domain}
                  href={`http://${locale.domain}`}
                  className="font-bold"
                  // TODO: Use next/link to *set* the desired locale
                  // locale={locale.defaultLocale}
                >
                  {locale.defaultLocale.split(`-`).pop()} | Marketing.
                </a>
              ))}
            </>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
