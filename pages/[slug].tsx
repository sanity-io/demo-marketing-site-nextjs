import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../components/container'
import Layout from '../components/layout'
import PageBuilder from '../components/page-builder'
import PostHeader from '../components/post-header'
import PostTitle from '../components/post-title'
import { pageQuery, pageSlugsQuery, settingsQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import { PageProps, PageQueryParams } from '../types'

interface Props {
  data: PageProps
  preview: any
  query: string | null
  queryParams: PageQueryParams
  blogSettings: any
}

export default function Page(props: Props) {
  const { data: initialData, preview, query, queryParams, blogSettings } = props
  const router = useRouter()

  const { data } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: initialData,
    enabled: preview,
  })
  const { title = 'Marketing.' } = blogSettings || {}

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview} queryParams={queryParams}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="flex flex-col gap-6 py-12 md:gap-12 md:py-24">
              <Head>
                <title>{`${data.title} | ${title}`}</title>
                {/* {post.coverImage?.asset?._ref && (
                  <meta
                    key="ogImage"
                    property="og:image"
                    content={urlForImage(post.coverImage)
                      .width(1200)
                      .height(627)
                      .fit('crop')
                      .url()}
                  />
                )} */}
              </Head>
              <PostHeader title={data?.title ?? `Untitled`} />
              {data.content && data.content.length > 0 ? (
                <PageBuilder rows={data?.content} />
              ) : null}
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, preview = false, previewData }) {
  // These query params are used to power this preview
  // And fed into <Alert /> to create ✨ DYNAMIC ✨ params!
  const queryParams: PageQueryParams = {
    // Necessary to query for the right page
    // And used by the preview route to redirect back to it
    slug: params.slug,
    // This demo uses a "market" field to separate documents
    // So that content does not leak between markets, we always include it in the query
    market: locale.split(`-`).pop().toUpperCase() ?? `US`,
    // In preview mode we can set the audience
    // In production this should be set in a session cookie
    audience:
      preview && previewData?.audience
        ? previewData.audience
        : Math.round(Math.random()),
    // Some Page Builder blocks are set to display only on specific times
    // In preview mode, we can set this to preview the page as if it were a different time
    // By default, set `null` here and the query will use GROQ's cache-friendly `now()` function
    // Do not pass a dynamic value like `new Date()` as it will uniquely cache every request!
    date: preview && previewData?.date ? previewData.date : null,
  }

  const page = await getClient(preview).fetch(pageQuery, queryParams)
  const websiteSettings = await getClient(preview).fetch(settingsQuery)

  return {
    props: {
      preview,
      data: page,
      query: preview ? pageQuery : null,
      queryParams: preview ? queryParams : null,
      websiteSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  // The context here only has access to ALL locales
  // Not the current one we're looking at
  // So sadly, we have to fetch all slugs for all locales
  const paths = await getClient(false).fetch(pageSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
