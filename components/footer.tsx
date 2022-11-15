// import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import Container from './container'

export default function Footer() {
  const { domainLocales } = useRouter()

  return (
    <div className="dark:bg-black text-black py-5 bg-white dark:text-white">
      <Container>
        <div className="flex items-center gap-5">
          <span>Global Sites:</span>
          {domainLocales && domainLocales.length > 0
            ? domainLocales.map((locale) => (
                <a
                  key={locale.domain}
                  href={`http://${locale.domain}`}
                  className="font-bold"
                  // TODO: Use next/link to *set* the desired locale
                  // locale={locale.defaultLocale}
                >
                  {locale.defaultLocale.split(`-`).pop()} | Marketing.
                </a>
              ))
            : null}
        </div>
      </Container>
    </div>
  )
}
