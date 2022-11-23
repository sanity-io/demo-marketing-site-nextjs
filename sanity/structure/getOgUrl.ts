export function getOgUrl(document) {
  const url = new URL('/api/og', location.origin)
  url.searchParams.set('title', document?.title)
  url.searchParams.set('image', JSON.stringify(document?.seo?.image))
  // TODO: Get from 'settings' document
  url.searchParams.set('siteTitle', `Bunzo`)

  return url.toString()
}