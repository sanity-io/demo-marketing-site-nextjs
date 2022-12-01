import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '../components/container'
import Layout from '../components/layout'
import Page from '../components/page'
import PostTitle from '../components/post-title'
import { usePreview } from '../sanity/sanity'
import { GlobalDataProps, PageProps, PageQueryParams } from '../types'

interface Props {
  data: PageProps
  query: string | null
  queryParams: PageQueryParams
  globalData: GlobalDataProps
}

export default function PreviewPage(props: Props) {
  const { query, queryParams, globalData } = props
  const router = useRouter()

  const data = usePreview(null, query, queryParams) || props.data
  const { title = 'Marketing.' } = globalData?.settings || {}

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview queryParams={queryParams} globalData={globalData}>
      {router.isFallback ? (
        <Container>
          <PostTitle>Loading…</PostTitle>
        </Container>
      ) : (
        <>
          <Head>
            <title>{`${data.title} | ${title}`}</title>
          </Head>
          <Page {...data} />
        </>
      )}
    </Layout>
  )
}
