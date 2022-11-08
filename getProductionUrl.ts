import settingsType from './schemas/settings'
import postType from './schemas/post'
import { Slug } from 'sanity'

export function getProductionUrl() {
  return async (prev, { document }) => {
    const url = new URL('/api/preview', location.origin)
    const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
    if (secret) {
      url.searchParams.set('secret', secret)
    }

    try {
      switch (document._type) {
        case settingsType.name:
          break
        case postType.name:
          url.searchParams.set('slug', (document.slug as Slug).current!)
          break
        default:
          return prev
      }
      return url.toString()
    } catch {
      return prev
    }
  }
}
