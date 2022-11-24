import Head from 'next/head'
import Link from 'next/link'

import Container from '../components/container'
import Layout from '../components/layout'
import PostHeader from '../components/post-header'
import Title from '../components/title'
import { MARKETS } from '../lib/constants'
import { indexQuery, settingsQuery } from '../sanity/queries'
import { usePreviewSubscription } from '../sanity/sanity'
import { getClient } from '../sanity/sanity.server'
import { PageQueryParams, PageStubProps, WebsiteSettingsProps } from '../types'

interface Props {
  data: PageStubProps[]
  preview: boolean
  query: string | null
  queryParams: PageQueryParams
  websiteSettings: WebsiteSettingsProps
}

export default function Index(props: Props) {
  const {
    data: initialData,
    preview,
    query,
    queryParams,
    websiteSettings,
  } = props
  const { data: allPages } = usePreviewSubscription(query, {
    initialData: initialData,
    enabled: preview,
    params: queryParams,
  })
  const { title = 'Marketing Site.' } = websiteSettings || {}

  return (
    <>
      <Layout
        preview={preview}
        queryParams={queryParams}
        websiteSettings={websiteSettings}
      >
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <div className="flex flex-col gap-6 py-12 md:gap-12 md:py-24">
            <PostHeader title="Principled creative freedom" />
            {allPages?.length > 0 ? (
              <ul>
                {allPages.map((page) => (
                  <li key={page._id}>
                    <Link href={page.slug}>
                      <Title title={page.title} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pages found</p>
            )}
          </div>
        </Container>
      </Layout>
    </>
  )
}

// Takes `en-US` and returns `US`
export function getMarketFromNextLocale(locale: string) {
  return locale.split(`-`).pop().toUpperCase()
}

// Takes `en-US` and returns `en`
export function getLanguageFromNextLocale(locale: string) {
  return locale.split(`-`).shift()
}

export async function getStaticProps(context) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { locale, preview = false } = context

    // Scope index to just this `market`
    const market = getMarketFromNextLocale(locale)
    // Scope index to just this `language`, if the market contains more than one
    const language =
      MARKETS.find((m) => m.name === market).languages.length > 1
        ? getLanguageFromNextLocale(locale)
        : null

    const queryParams = { market, language }
    const allPages = await getClient(preview).fetch(indexQuery, queryParams)
    const websiteSettings = await getClient(preview).fetch(settingsQuery, {
      id: `${market}-settings`.toLowerCase(),
      language,
    })

    return {
      props: {
        preview,
        data: allPages,
        query: preview ? indexQuery : null,
        queryParams: preview ? queryParams : null,
        websiteSettings,
      },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  return {
    props: {},
    revalidate: undefined,
  }
}
