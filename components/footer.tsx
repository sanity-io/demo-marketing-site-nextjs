import { useRouter } from 'next/router'

import { getMarketFromNextLocale } from '../pages'
import Button from './button'
import Container from './container'
import Logo from './logo'

type FooterProps = {
  title: string
}

export default function Footer(props: FooterProps) {
  const { title } = props
  const { domainLocales, locale } = useRouter()

  return (
    <div className="border-t border-gray-100 py-4 dark:border-gray-900 md:py-5">
      <Container>
        <div className="flex items-center gap-5">
          <Logo>{title}</Logo>
          {domainLocales && domainLocales.length > 0 ? (
            <div className="ml-auto flex items-center gap-2">
              <span>Global sites</span>
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
