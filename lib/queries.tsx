import groq from 'groq'

const pageFields = groq`
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "page" && defined(slug.current) && upper(market) == upper($market)] | order(date desc, _updatedAt desc) {
  ${pageFields}
}`

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug] | order(_updatedAt desc) [0] {
  title,
  "slug": slug.current,
  market,
  content[
    // Neither start or end are set
    (!defined(rowOptions.displayTo) && !defined(rowOptions.displayFrom))
    // Only the end is set, check if it has expired
    || (!defined(rowOptions.displayTo) && dateTime(rowOptions.displayFrom) < dateTime(coalesce($date, now())))
    // Only the start is set, check if it has begun
    || (dateTime(rowOptions.displayTo) > dateTime(coalesce($date, now())) && !defined(rowOptions.displayFrom))
    // Both end and start are set, check if the current time is between them
    // || (dateTime(coalesce($date, now())) in dateTime(rowOptions.displayFrom) .. dateTime(rowOptions.displayTo))
    || (
        dateTime(rowOptions.displayTo) > dateTime(coalesce($date, now())) 
        && dateTime(rowOptions.displayFrom) < dateTime(coalesce($date, now()))
      )
  ]{
    _key,
    _type,
    _type == "hero" => {
      ...(hero->{title})
    },
    _type == "experiment" => {
      ...(experiments[$audience]->{
        title
      })
    }
  }
}`

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageFields}
}
`
