import { Slug } from 'sanity'

import pageType from '../schemas/documents/page'

export async function getPreviewUrl(document) {
  const url = new URL('/api/preview', location.origin)
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  try {
    switch (document._type) {
      case pageType.name:
        url.searchParams.set('slug', (document.slug as Slug).current!)
        break
      default:
        return ``
    }

    return url.toString()
  } catch {
    return ``
  }
}
