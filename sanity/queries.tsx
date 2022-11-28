import groq from 'groq'

export const globalDataQuery = groq`{
  "settings": *[_id == $settingsId][0]{
    // Get the first item if no language was specified
    "title": select($language == null => title[0].value, title[_key == $language][0].value),
  },
  "menus": *[_id == $menuId][0]{
    "headerPrimary": headerPrimary[(defined(link.text) && defined(link.url)) || defined(link.reference)]{
      _key,
      "link": link{
        url,
        text,
        reference->{
          title,
          "slug": slug.current
        }
      },
      children
    }
  }
}`

const pageFields = groq`
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
      ...(hero->{
        title,
        subtitle,
        image,
        // "links": links[(defined(link.text) && defined(link.url)) || defined(link.reference._ref)]{
          // _key,
          // ...
        // }
        links[]{
          ...,
          _key,
          url,
          text,
          reference->{
            title,
            "slug": slug.current
          }
        }
      })
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
`

export const homeQuery = groq`
*[_id == $homeId][0]{
  ${pageFields}
}`

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug && upper(market) == upper($market)] | order(_updatedAt desc) [0] {
  ${pageFields}
}`

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current) && defined(market)].slug.current
`

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0].slug.current
`
