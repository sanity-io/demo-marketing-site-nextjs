import type {NextApiRequest, NextApiResponse} from 'next'

import {config} from '../../lib/config'
import {previewBySlugQuery} from '../../sanity/queries'
import {getClient} from '../../sanity/sanity.server'

function redirectToPreview(res: NextApiResponse, Location: string, data = {}) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(data)
  // Redirect to a preview capable route
  res.writeHead(307, {Location})
  return res.end()
}

type PreviewData = {
  date?: string | null
  audience?: 0 | 1
}

// In this preview route we direct to a full-path URL
// This is so market and language-specific routes work from a single endpoint
export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  // Skip if preview is already enabled (TODO: check if this is okay)
  const secret = config.previewSecret
  if (!req.preview && secret && req.query.secret !== secret) {
    return res.status(401).json({message: 'Invalid secret'})
  }

  // Get existing previewData values
  const existingPreviewData = req.previewData as PreviewData

  // Find any query params passed-in to setup or overwrite preview data
  const queryDate = Array.isArray(req.query.date)
    ? req.query.date[0]
    : req.query.date
  // I refactored this to pass linting, but I don't quite know what this is doing
  const queryAudience = ['string', 'boolean'].includes(typeof req.previewData)
    ? null
    : Number(req.query.audience)

  // Control some of the query parameters in Preview mode
  // These should typically be set by a cookie or session
  const previewData = {
    // Either use the date passed-in or reset to null
    date: req.query.date ? new Date(queryDate).toISOString() : null,
    // Use the existing audience or create a new one
    audience: [0, 1].includes(existingPreviewData.audience)
      ? existingPreviewData.audience
      : Math.round(Math.random()),
  }

  // Overwrite audience to whatever was passed-in as a query param, if valid
  if ([0, 1].includes(queryAudience)) {
    previewData.audience = Number(queryAudience)
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/', previewData)
  }

  // Check if the post with the given `slug` exists
  const pageSlug = await getClient(true).fetch(previewBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!pageSlug) {
    return res.status(401).json({message: 'Invalid slug'})
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  switch (req.query.type) {
    case 'page':
      return redirectToPreview(res, `/${pageSlug}`, previewData)
    case 'article':
      return redirectToPreview(res, `/articles/${pageSlug}`, previewData)
    default:
      return redirectToPreview(res, `/${pageSlug}`, previewData)
  }
}
