import groq from 'groq'

const pageFields = groq`
  _id,
  title,
  "slug": slug.current,
`

export const settingsQuery = groq`*[_type == "settings" && _id == $id][0]{
  // Get the first item if no language was specified
  "title": select($language == null => title[0].value, title[_key == $language][0].value),
}`

export const indexQuery = groq`
*[
  _type == "page" 
  // Only include pages with slugs
  && defined(slug.current) 
  // Filter pages by market
  && upper(market) == upper($market)
  // If $language is true, don't filter. If $language is provided, filter by it.
  && select($language == null => true, upper(language) == upper($language))
] | order(date desc, _updatedAt desc) {
  ${pageFields}
}`

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug && upper(market) == upper($market)] | order(_updatedAt desc) [0] {
  title,
  "slug": slug.current,
  market,
  content[
    // Neither start or end dates are set
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
    _type == "quote" => {
      ...(quote->{quote})
    },
    _type == "experiment" => {
      ...(experiments[$audience]->{
        title
      })
    }
  },
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    "slug": slug.current,
    language
  },
}`

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageFields}
}
`
