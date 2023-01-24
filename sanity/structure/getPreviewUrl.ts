import {SanityDocument, Slug} from 'sanity'

import {config} from '../../lib/config'
import articleType from '../../schemas/documents/article'
import pageType from '../../schemas/documents/page'

type PreviewDocument = SanityDocument & {
  market?: string
  slug?: Slug
}

export function getPreviewUrl(document: PreviewDocument): string {
  // Ensure URL origin matches the document's market
  // We need to load the Preview API route
  // In the same subdomain as the document's market
  // So that the cookie is set on the right domain
  const market = document?.market?.toLowerCase()

  if (!market) {
    return ``
  }

  // Market is the US = must use root domain
  // Market is not the US = must use market subdomain
  const rootLocation = window.location.host.split(`.`).pop()
  const marketOrigin = market.toUpperCase() === "US" ? rootLocation : `${market.toLowerCase()}.${rootLocation}`

  const url = new URL('/api/preview', `${window.location.protocol}//${marketOrigin}`)
  const secret = config.previewSecret
  if (secret) {
    url.searchParams.set('secret', secret)
  }

  url.searchParams.set('type', document._type)

  try {
    switch (document._type) {
      case pageType.name:
        url.searchParams.set('slug', document.slug.current!)
        break
      case articleType.name:
        url.searchParams.set('slug', document.slug.current!)
        break
      default:
        return ``
    }

    return url.toString()
  } catch {
    return ``
  }
}
