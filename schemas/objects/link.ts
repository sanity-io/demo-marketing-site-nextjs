import { defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',

  fields: [
    {
      name: `reference`,
      type: `reference`,
      description: `If this link has a reference and a URL, the reference will be used`,
      to: [{ type: 'page' }],
      // Read-only if a URL is used
      readOnly: ({ parent }) => Boolean(parent?.url),
      options: {
        filter: ({ document }) => {
          // Filter to the same market
          if (document.market) {
            return {
              filter: `market == $market`,
              params: { market: document.market },
            }
          }

          return null
        },
      },
    },
    {
      name: `text`,
      description: `Can be used to overwrite the title of the referenced page`,
      type: `string`,
      // Text is required if a Reference was not used
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          return context.parent?.url && !value
            ? `Link text is required if a URL is provided`
            : true
        }),
    },
    {
      name: `url`,
      title: 'URL',
      type: `url`,
      // Read-only if a reference is used
      readOnly: ({ parent }) => Boolean(parent?.reference),
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https', 'mailto', 'tel'],
        }),
    },
  ],
  preview: {
    select: {
      refSlug: 'reference.slug.current',
      refTitle: 'reference.title',
      text: 'text',
      url: 'url',
    },
    prepare(selection) {
      const { refSlug, refTitle, text, url } = selection

      return {
        title: !text && !refTitle ? `Empty Text` : text ?? refTitle,
        subtitle: !url && !refSlug ? `Empty Link` : refSlug ?? url,
      }
    },
  },
})
