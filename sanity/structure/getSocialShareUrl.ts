import { SanityReference } from '@sanity/image-url/lib/types/types'
import { SanityClient, SanityDocument } from 'sanity'

type Document = SanityDocument & {
  quote: string
  person: SanityReference
}
export async function getSocialShareUrl(
  document: Document,
  client: SanityClient
) {
  const url = new URL('/api/social-share', location.origin)

  const result = await client.fetch(
    `*[_type == "person" && _id == $id][0]{
      name,
      title,
      picture,
      company->{
        name,
        logo
      },
      "siteTitle": *[_type == "settings" && market == ^.market][0]{
        "title": title[0].value
      }.title
    }`,
    {
      id: document?.person?._ref ?? ``,
      market: document?.market ?? ``
    }
  )

  url.searchParams.set('quote', document.quote)

  if (!result) {
    return url.toString()
  }

  console.log(result)

  url.searchParams.set('name', result.name)
  url.searchParams.set('title', result.title)
  url.searchParams.set('picture', JSON.stringify(result.picture))
  url.searchParams.set('company.name', result.company.name)
  url.searchParams.set('logo', JSON.stringify(result.company.logo))
  url.searchParams.set('siteTitle', result.siteTitle)

  return url.toString()
}
