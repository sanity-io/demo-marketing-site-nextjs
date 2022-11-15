import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../components/container'
import Layout from '../components/layout'
import PageBuilder from '../components/page-builder'
import PostHeader from '../components/post-header'
import PostTitle from '../components/post-title'
import Title from '../components/title'
import { pageQuery, pageSlugsQuery, settingsQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
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

export async function getStaticProps({ params, preview = false, previewData }) {
  // These query params are used to power this preview
  // And fed into <Alert /> to create ✨ DYNAMIC ✨ params!
  const queryParams: PageQueryParams = {
    // Necessary to query for the right page
    // And used by the preview route to redirect back to it
    slug: params.slug,
    // In preview mode we can set the audience
    // This should otherwise be set in a session or cookie
    audience:
      preview && previewData?.audience
        ? previewData.audience
        : Math.round(Math.random()),
    // We don't pass in a dynamic time as that would bust caching badly
    // Rely on GROQ's `now()` function as a fallback
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

export async function getStaticPaths(context) {
  console.log(context);
  const paths = await getClient(false).fetch(pageSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
