import {Menu} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'

import {GlobalDataProps} from '../types'
import Button from './Button'
import Container from './Container'
import Logo from './Logo'

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
        <div className="flex items-center gap-5 py-3 lg:py-4">
          <Logo>{title}</Logo>
          {headerPrimary && headerPrimary?.length > 0 ? (
            <ul className="hidden items-center justify-start md:gap-2 lg:flex">
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
          
          <div className="ml-auto flex flex-1 items-center justify-end gap-5 lg:hidden">
            <Menu />
          </div>
        </div>
      </Container>
    </div>
  )
}
