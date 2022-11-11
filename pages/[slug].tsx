import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../components/container'
import Header from '../components/header'
import Layout from '../components/layout'
import PostHeader from '../components/post-header'
import PostTitle from '../components/post-title'
import { pageQuery, pageSlugsQuery, settingsQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { PageProps } from '../types'

interface Props {
  data: PageProps
  preview: any
  query: string | null
  queryParams: { [key: string]: string | number } | null
  blogSettings: any
}

export default function Post(props: Props) {
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
        <Header title={title} />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
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
              <PostHeader title={data?.title ?? `Untitled?`} />
              {data.content && data.content.length > 0 ? (
                <div className="flex flex-col gap-8 pb-24">
                  {data.content.map((row) => (
                    <div
                      key={row._key}
                      className="flex flex-col gap-2 bg-black p-4 text-white"
                    >
                      <h2 className="text-3xl font-bold leading-tight tracking-tighter">
                        {row?.title ?? row._type}
                      </h2>
                      <hr />
                      <span className="font-mono">{row._type}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {/* <PostBody content={post.content} /> */}
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
  const queryParams = {
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
  console.log(`Query Params`, queryParams)
  const page = await getClient(preview).fetch(pageQuery, queryParams)
  const blogSettings = await getClient(preview).fetch(settingsQuery)

  return {
    props: {
      preview,
      data: page,
      query: preview ? pageQuery : null,
      queryParams: preview ? queryParams : null,
      blogSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(pageSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
