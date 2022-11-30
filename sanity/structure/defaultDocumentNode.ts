import { DefaultDocumentNodeResolver, StructureBuilder } from 'sanity/desk'
import DocumentsPane from 'sanity-plugin-documents-pane'
import Iframe from 'sanity-plugin-iframe-pane'

import OGPreview from '../components/OGPreview'
import SocialSharePreview from '../components/SocialSharePreview'
import { getOgUrl } from './getOgUrl'
import { getPreviewUrl } from './getPreviewUrl'
import { getSocialShareUrl } from './getSocialShareUrl'

const pagesUsed = (S) =>
  S.view
    .component(DocumentsPane)
    .options({
      query: `*[!(_id in path("drafts.**")) && _type == "page" && references($id)]`,
      params: { id: `_id` },
    })
    .title('Pages Used')

// `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient }
) => {
  const client = getClient({ apiVersion: `2022-11-24` })

  switch (schemaType) {
    case `page`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc) => getPreviewUrl(doc),
            reload: { button: true },
          })
          .title('Preview'),
        S.view
          .component(OGPreview)
          .options({
            url: (doc) => getOgUrl(doc),
          })
          .title('Open Graph'),
      ])
    case `quote`:
      return S.document().views([
        S.view.form(),
        pagesUsed(S),
        S.view
          .component(SocialSharePreview)
          .options({
            url: (doc) => getSocialShareUrl(doc, client),
          })
          .title('Social Share'),
      ])
    case `promotion`:
    case `hero`:
      return S.document().views([S.view.form(), pagesUsed(S)])
    default:
      return S.document().views([S.view.form()])
  }
}
