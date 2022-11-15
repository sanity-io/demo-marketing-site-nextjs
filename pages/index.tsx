import Head from 'next/head'
import Link from 'next/link'

import Container from '../components/container'
import Layout from '../components/layout'
import PostHeader from '../components/post-header'
import Title from '../components/title'
import { indexQuery, settingsQuery } from '../lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'

export default function Index({ data: initialData, preview, blogSettings }) {
  const { data: allPages } = usePreviewSubscription(indexQuery, {
    initialData: initialData,
    enabled: preview,
  })
  const { title = 'Marketing Site.' } = blogSettings || {}

  return (
    <>
      <Layout preview={preview}>
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
            ) : null}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const { preview = false, previewData } = context
  console.log(`home page context`, context)

  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const queryParams = {
      market: 'us',
    }
    const allPages = overlayDrafts(
      await getClient(preview).fetch(indexQuery, queryParams)
    )
    const websiteSettings = await getClient(preview).fetch(settingsQuery)

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
