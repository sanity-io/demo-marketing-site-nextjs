import Link from 'next/link'
import { useRouter } from 'next/router'

import Container from './container'

export default function Header() {
  const { domainLocales, locale } = useRouter()

  const domainLocale =
    domainLocales &&
    domainLocales.find((domainLocale) => domainLocale.defaultLocale === locale)

  return (
    <div className="border-b border-gray-100 py-5">
      <Container>
        <div className="flex items-center gap-5">
          {/* TODO: use href from domainLocale */}
          <Link
            href="/"
            className="text-lg font-bold leading-tight tracking-tight md:text-xl md:tracking-tighter"
          >
            {/* TODO: Dynamic name from site meta */}
            Marketing.
          </Link>
          {domainLocale?.locales && domainLocale.locales.length > 1 ? (
            <div className="ml-auto flex items-center gap-5 text-sm font-bold uppercase">
              {domainLocale.locales.map((language) => (
                <Link
                  key={language}
                  locale={language}
                  href="/"
                  className={locale === language ? `opacity-50` : `opacity-100`}
                >
                  {language.split(`-`)[0]}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
