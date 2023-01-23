import {useRouter} from 'next/router'
import * as React from 'react'

import {getMarketFromNextLocale} from '../../pages'
import Button from './Button'
import Container from './Container'
import Logo from './Logo'

type FooterProps = {
  title: string
}

export default function Footer(props: FooterProps) {
  const {title} = props
  const {domainLocales, locale} = useRouter()

  return (
    <div className="border-t border-gray-200 dark:border-gray-800">
      <Container className="relative">
        <div className="flex items-center gap-5 py-4 md:py-5">
          <Logo>{title}</Logo>

          {domainLocales && domainLocales.length > 0 ? (
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className="w-full lg:w-auto">Global sites</span>
              {domainLocales.map((domainLocale) => (
                <Button
                  key={domainLocale.domain}
                  disabled={domainLocale.defaultLocale === locale}
                  href={
                    domainLocale.defaultLocale === `en-US`
                      ? `/`
                      : `/${domainLocale.defaultLocale}`
                  }
                  locale={domainLocale.defaultLocale}
                  text={getMarketFromNextLocale(domainLocale.defaultLocale)}
                  mode="ghost"
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  )
}
