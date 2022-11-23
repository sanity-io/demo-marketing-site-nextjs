import { Slug } from 'sanity'

import pageType from '../schemas/documents/page'

export async function getPreviewUrl(document) {
  // Ensure URL origin matches the document's market
  // We need to load the Preview API route
  // In the same subdomain as the document's market
  // So that the cookie is set on the right domain
  const market = document?.market?.toLowerCase()

  if (!market) {
    return ``
  }

  const currentUrlMatchesMarket =
    market !== 'US' && window.location.host.split(`.`)[0].toUpperCase() !== market.toUpperCase()

  if (!currentUrlMatchesMarket) {
    return ``
  }

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
