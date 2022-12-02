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
  content[]{
    _key,
    _type,
    _type == "article" => {
      ...(@->{
        icon,
        title,
        subtitle,
        image,
        summary,
        links[]{
          _key,
          url,
          text,
          reference->{
            title,
            "slug": slug.current
          }
        },
        visibility
      })
    },
    _type == "intermission" => {
      ...(@->{
        statements,
        background{
          mediaType == "image" => {
            ...image
          },
          mediaType == "video" => {
            ...video{
              _type,
              asset->
            }
          }
        }
      })
    },
    _type == "quote" => {
      ...(@->{
        quote,
        person->{
          name,
          title,
          picture,
          company->{
            name,
            logo
          }
        },
        visibility
      })
    },
    _type == "experiment" => {
      ...(experiments[$audience]->{
        title,
        subtitle,
        image,
        summary,
        links[]{
          _key,
          url,
          text,
          reference->{
            title,
            "slug": slug.current
          }
        },
        visibility
      })
    },
    _type == "logos" => {
      "logos": select(
        count(logos) > 0 => logos[]->,
        *[_type == "company" && market == $market]{
          _id,
          name,
          logo
        }
      )
    }
  }[
    // Filter out elements where "visibility" is not valid:
    // Neither start or end dates are set
    (!defined(visibility.displayTo) && !defined(visibility.displayFrom))
    // Only the end is set, check if it has expired
    || (!defined(visibility.displayTo) && dateTime(visibility.displayFrom) < dateTime(coalesce($date, now())))
    // Only the start is set, check if it has begun
    || (dateTime(visibility.displayTo) > dateTime(coalesce($date, now())) && !defined(visibility.displayFrom))
    // Both end and start are set, check if the current time is between them
    || (dateTime(coalesce($date, now())) in dateTime(visibility.displayFrom) .. dateTime(visibility.displayTo))
    || (
        dateTime(visibility.displayTo) > dateTime(coalesce($date, now()))
        && dateTime(visibility.displayFrom) < dateTime(coalesce($date, now()))
      )
  ],
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
