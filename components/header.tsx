import Link from 'next/link'
import { useRouter } from 'next/router'

import Container from './container'

export default function Header() {
  const { domainLocales, locale } = useRouter()

  const domainLocale = domainLocales.find(
    (domainLocale) => domainLocale.defaultLocale === locale
  )

  return (
    <div className="bg-white py-5 text-black dark:bg-black dark:text-white">
      <Container>
        <div className="flex items-center gap-5">
          {/* TODO: Dynamic name from site meta */}
          <span className="text-lg font-bold leading-tight tracking-tight md:text-xl md:tracking-tighter">
            Marketing.
          </span>
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
