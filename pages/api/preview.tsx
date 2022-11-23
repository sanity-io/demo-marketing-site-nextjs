import type { NextApiRequest, NextApiResponse } from 'next'

import { pageBySlugQuery } from '../../sanity/queries'
import { getClient } from '../../sanity/sanity.server'

function redirectToPreview(res: NextApiResponse, Location: string, data = {}) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(data)
  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

// In this preview route we direct to a full-path URL
// This is so market and language-specific routes work from a single endpoint
export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the secret if it's provided, enables running preview mode locally before the env var is setup
  // Skip if preview is already enabled (TODO: check if this is okay)
  const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
  if (!req.preview && secret && req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  // Control some of the query parameters in Preview mode
  // These should typically be set by a cookie or session
  const previewData = {
    // Either use the date passed-in or reset to null
    date: req.query.date ? new Date(req.query.date).toISOString() : null,
    // Use the existing audience or create a new one
    audience: req.previewData.audience ?? Math.round(Math.random()),
  }

  // Overwrite audience to whatever was passed-in as a query param, if valid
  if (req.query.audience && [0, 1].includes(Number(req.query.audience))) {
    previewData.audience = Number(req.query.audience)
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, '/', previewData)
  }

  // Check if the post with the given `slug` exists
  const post = await getClient(true).fetch(pageBySlugQuery, {
    slug: req.query.slug,
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, `/${post.slug}`, previewData)
}
