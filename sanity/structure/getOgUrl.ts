import {SanityDocument} from '@sanity/client'

export function getOgUrl(document: SanityDocument): string {
  const url = new URL('/api/og', location.origin)
  url.searchParams.set('title', document?.seo?.title ?? document?.title)
  url.searchParams.set('image', JSON.stringify(document?.seo?.image))
  // TODO: Get from 'settings' document
  url.searchParams.set('siteTitle', `Enigma`)

  return url.toString()
}
