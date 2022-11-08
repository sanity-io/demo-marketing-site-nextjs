import settingsType from './schemas/settings'

export function deskToolConfig() {
  return {
    structure: (S) => {
      // The `Settings` root list item
      const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
        S.listItem()
          .title(settingsType.title)
          .icon(settingsType.icon)
          .child(
            S.editor()
              .id(settingsType.name)
              .schemaType(settingsType.name)
              .documentId(settingsType.name)
          )

      // The default root list items (except custom ones)
      const defaultListItems = S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== settingsType.name
      )

      return S.list()
        .title('Content')
        .items([settingsListItem, S.divider(), ...defaultListItems])
    },

    // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
    // You can add any React component to `S.view.component` and it will be rendered in the pane
    // and have access to content in the form in real-time.
    // It's part of the Studio's “Structure Builder API” and is documented here:
    // https://www.sanity.io/docs/structure-builder-reference
    defaultDocumentNode: (S, { schemaType }) => {
      if (schemaType === 'post') {
        return S.document().views([
          S.view.form(),
          // S.view.component(PostsPreview).title('Preview')
        ])
      }

      return null
    },
  }
}
