import {NextApiResponse} from 'next'

export default function exit(_, res: NextApiResponse) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, {Location: '/'})
  return res.end()
}
