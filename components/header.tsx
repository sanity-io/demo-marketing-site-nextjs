import Link from 'next/link'
import { useRouter } from 'next/router'

import link from '../schemas/objects/link'
import { GlobalDataProps } from '../types'
import Container from './container'

type HeaderProps = {
  title: string
  headerPrimary?: GlobalDataProps['menus']['headerPrimary']
}

export default function Header(props: HeaderProps) {
  const { title, headerPrimary } = props
  const { domainLocales, locale } = useRouter()

  const domainLocale =
    domainLocales &&
    domainLocales.find((domainLocale) => domainLocale.locales.includes(locale))
  // const domainMarket = domainLocale.locales[0].split(`-`)[1]

  return (
    <div className="border-b border-gray-100 py-5">
      <Container>
        <div className="flex items-center gap-5">
          {/* TODO: use href from domainLocale */}
          <Link
            href="/"
            className="text-lg font-bold leading-tight tracking-tight md:text-xl md:tracking-tighter"
          >
            {/* {domainMarket}
            {`//`} */}
            {title}
          </Link>
          {headerPrimary && headerPrimary?.length > 0 ? (
            <ul className="flex items-center justify-start gap-5">
              {headerPrimary.map((item) => (
                <li key={item._key} className="font-medium text-gray-500">
                  {/* TODO: These links could include the `locale` */}
                  {item?.link?.reference?.title &&
                  item?.link?.reference?.slug ? (
                    <Link href={`/${item.link.reference.slug}`}>
                      {item.link.text ?? item.link.reference.title}
                    </Link>
                  ) : null}
                  {item?.link?.url && item?.link?.text ? (
                    <Link href={item.link.url}>{item.link.text}</Link>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
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
