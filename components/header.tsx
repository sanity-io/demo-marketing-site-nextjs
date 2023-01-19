import {Menu} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'

import {GlobalDataProps} from '../types'
import Button from './button'
import Container from './container'
import Logo from './logo'

type HeaderProps = {
  title: string
  headerPrimary?: GlobalDataProps['menus']['headerPrimary']
}

export default function Header(props: HeaderProps) {
  const {title, headerPrimary} = props
  const {domainLocales, locale} = useRouter()

  const domainLocale =
    domainLocales && domainLocales.find((l) => l.locales.includes(locale))

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <Container className="relative">
        <div className="flex items-center gap-5 py-3 sm:py-4">
          <Logo>{title}</Logo>
          {headerPrimary && headerPrimary?.length > 0 ? (
            <ul className="hidden items-center justify-start sm:flex md:gap-2">
              {headerPrimary.map((item) => (
                <li key={item._key}>
                  <Button mode="bleed" {...item.link} />
                </li>
              ))}
              <li>
                <Button mode="ghost" href="/studio" text="Studio" />
              </li>
            </ul>
          ) : null}
          <div className="ml-auto flex items-center gap-5 sm:hidden">
            <Menu />
          </div>
          {domainLocale?.locales && domainLocale.locales.length > 1 ? (
            <div className="ml-auto flex items-center gap-5 text-sm uppercase">
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
