/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * You can quickly add the webhook configuration to your Sanity project with this URL:

  https://www.sanity.io/manage/webhooks/share?name=On-demand+Revalidation&description=Webhook+configuration+for+a+Next.js+blog+with+an+Incremental+Static+Revalidation+serverless+route+set+up.+Remember+to+update+the+URL+for+your+hosted+site%2C+as+well+as+a+secret+that+you+copy+to+the+environment+variables+where+your+Next.js+site+is+hosted+%28SANITY_REVALIDATE_SECRET%29.&url=https%3A%2F%2FYOUR_NEXTJS_SITE_URL%2Fapi%2Frevalidate&on=create&on=update&on=delete&filter=%5B%22post%22%2C+%22author%22%2C+%22settings%22%5D+in+_type&projection=&httpMethod=POST&apiVersion=v2021-03-25&includeDrafts=&headers=%7B%7D

* MANUAL SETUP:
  * 1. Go to the API section of your Sanity project on sanity.io/manage
  * 2. Click "Create webhook"
  * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
  * 4. Trigger on: "Create", "Update", and "Delete"
  * 5. Filter: ["post", "author", "settings"] in _type
  * 6. Projection: Leave empty
  * 7. HTTP method: POST
  * 8. API version: v2021-03-25
  * 9. Include drafts: No
  * 10. HTTP Headers: Leave empty
  * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
  * 12. Save the cofiguration

 */

import type {NextApiRequest, NextApiResponse} from 'next'
import {parseBody} from 'next-sanity/webhook'

import {env} from '../../lib/utils/env'
import {getClient} from '../../sanity/sanity.server'

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

const AUTHOR_UPDATED_QUERY = /* groq */ `
  *[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`
const POST_UPDATED_QUERY = /* groq */ `*[_type == "post" && _id == $id].slug.current`
const SETTINGS_UPDATED_QUERY = /* groq */ `*[_type == "post"].slug.current`

const getQueryForType = (type) => {
  switch (type) {
    case 'author':
      return AUTHOR_UPDATED_QUERY
    case 'post':
      return POST_UPDATED_QUERY
    case 'settings':
      return SETTINGS_UPDATED_QUERY
    default:
      throw new TypeError(`Unknown type: ${type}`)
  }
}

const log = (msg, error?) =>
  // eslint-disable-next-line no-console
  console[error ? 'error' : 'log'](`[revalidate] ${msg}`)

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body, isValidSignature} = await parseBody(
    req,
    env('SANITY_REVALIDATE_SECRET')
  )
  if (!isValidSignature) {
    const invalidSignature = 'Invalid signature'
    log(invalidSignature, true)
    return res.status(401).json({success: false, message: invalidSignature})
  }

  const {_id: id, _type} = body
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id'
    log(invalidId, true)
    return res.status(400).json({message: invalidId})
  }

  log(`Querying post slug for _id '${id}', type '${_type}' ..`)
  const slug = await getClient(false).fetch(getQueryForType(_type), {id})
  const slugs = (Array.isArray(slug) ? slug : [slug]).map(
    (_slug) => `/posts/${_slug}`
  )
  const staleRoutes = ['/', ...slugs]

  try {
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))
    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    log(updatedRoutes)
    return res.status(200).json({message: updatedRoutes})
  } catch (err) {
    log(err.message, true)
    return res.status(500).json({message: err.message})
  }
}
