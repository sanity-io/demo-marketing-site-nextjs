import {PortableText} from '@portabletext/react'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import * as React from 'react'

import Container from '../../components/container'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import {
  articleQuery,
  articleSlugsQuery,
  globalDataQuery,
} from '../../sanity/queries'
import {urlForImage} from '../../sanity/sanity'
import {getClient} from '../../sanity/sanity.server'
import {GlobalDataProps, PageQueryParams} from '../../types'
import {getLanguageFromNextLocale, getMarketFromNextLocale} from '../'

interface Props {
  data: any
  preview: boolean
  queryParams: PageQueryParams
  globalData: GlobalDataProps
}

export default function Slug(props: Props) {
  const {data, preview, queryParams, globalData} = props
  const router = useRouter()

  const {title = 'Marketing.'} = globalData?.settings || {}

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} queryParams={queryParams} globalData={globalData}>
      {router.isFallback ? (
        <Loading />
      ) : (
        <>
          <Head>
            <title>{`${data.title} | ${title}`}</title>
          </Head>
          <div className="relative">
            {data.image ? (
              <div className="absolute top-0 left-0 aspect-video max-h-[400px] w-screen">
                <div className="absolute inset-0 z-10 h-full w-screen bg-gradient-to-b from-black/0 to-black/100" />
                <Image
                  className="absolute inset-0 h-full w-screen object-cover opacity-75"
                  src={urlForImage(data.image)
                    .width(1080)
                    .height(720)
                    .dpr(2)
                    .auto('format')
                    .url()}
                  alt={data?.title ?? ``}
                  width={1080}
                  height={720}
                />
              </div>
            ) : null}
          </div>
          <Container className="relative py-5">
            <div className="prose prose-lg relative z-10 pb-5 prose-headings:font-extrabold prose-headings:leading-none prose-headings:tracking-tight dark:prose-invert">
              {data.subtitle ? (
                <h3 className="text-magenta-400">{data.subtitle}</h3>
              ) : null}
              {data.title ? <h1>{data.title}</h1> : null}
              <PortableText value={data.content} />
            </div>
          </Container>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({
  params,
  locale,
  preview = false,
  previewData,
}) {
  // These query params are used to power this preview
  // And fed into <Alert /> to create ✨ DYNAMIC ✨ params!
  const queryParams: PageQueryParams = {
    // Necessary to query for the right page
    // And used by the preview route to redirect back to it
    slug: params.slug,
    // This demo uses a "market" field to separate documents
    // So that content does not leak between markets, we always include it in the query
    market: getMarketFromNextLocale(locale) ?? `US`,
    // Only markets with more than one language are likely to have a language field value
    language: getLanguageFromNextLocale(locale) ?? null,
    // In preview mode we can set the audience
    // In production this should be set in a session cookie
    audience:
      preview && previewData?.audience
        ? previewData?.audience
        : Math.round(Math.random()),
    // Some Page Builder blocks are set to display only on specific times
    // In preview mode, we can set this to preview the page as if it were a different time
    // By default, set `null` here and the query will use GROQ's cache-friendly `now()` function
    // Do not pass a dynamic value like `new Date()` as it will uniquely cache every request!
    date: preview && previewData?.date ? previewData.date : null,
  }

  const article = await getClient(preview).fetch(articleQuery, queryParams)
  const globalData = await getClient(preview).fetch(globalDataQuery, {
    settingsId: `${queryParams.market}-settings`.toLowerCase(),
    menuId: `${queryParams.market}-menu`.toLowerCase(),
    language: queryParams.language,
  })

  return {
    props: {
      preview,
      data: article,
      query: preview ? articleQuery : null,
      queryParams: preview ? queryParams : null,
      globalData,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  // The context here only has access to ALL locales
  // Not the current one we're looking at
  // So sadly, we have to fetch all slugs for all locales
  const paths = await getClient(false).fetch(articleSlugsQuery)
  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}
