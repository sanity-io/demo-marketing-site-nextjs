/* eslint-disable no-process-env */

type Config = {
  env: string
  sanity: {
    projectId?: string
    projectTitle?: string
    dataset?: string
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
    // Thus the data need to be fresh and API response time is less important.
    // When in development/working locally, it's more important to keep costs down as hot reloading can incur a lot of API calls
    // And every page load calls getStaticProps.
    // To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
    useCdn?: boolean
    // see https://www.sanity.io/docs/api-versioning for how versioning works
    apiVersion: string
  }
  revalidateSecret?: string
  previewSecret?: string
  // Keeping these out of the sanity object so we don't inadvertently configure
  // clients with tokens by passing the whole object to a client constructor
  readToken?: string
  writeToken?: string
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    projectTitle: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn:
      typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
    apiVersion: '2022-08-08',
  },
  readToken: process.env.SANITY_API_READ_TOKEN,
  writeToken: process.env.SANITY_API_WRITE_TOKEN,
  revalidateSecret: process.env.SANITY_REVALIDATE_SECRET,
  previewSecret: process.env.NEXT_PUBLIC_PREVIEW_SECRET,
}
