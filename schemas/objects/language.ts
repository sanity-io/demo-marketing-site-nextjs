import { defineField } from 'sanity'

import { MARKETS } from '../../lib/constants'

export default defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  // TODO: Hide field completely once initial value templates are configured
  hidden: ({ document, value }) => {
    const market = MARKETS.find((m) => m.name === document?.market)

    // Hide on *published* documents that have a language
    // In markets with more than one language
    if (market && market.languages.length > 1) {
      return !document._id.startsWith(`drafts.`) && Boolean(value)
    }

    return true
  },
  // This field should be populated by @sanity/document-internationalization
  readOnly: true,
  // Only required if this market has more than one language
  validation: (Rule) =>
    Rule.custom((value, { document }) => {
      const market = MARKETS.find((m) => m.name === document?.market)

      if (market && market.languages.length > 1) {
        return `Documents in the "${market.title}" Market require a language field`
      }

      if (!market.languages.find((l) => l.id === value)) {
        return `Invalid language "${value}", must be one of ${market.languages
          .map((l) => l.id)
          .join(', ')}`
      }

      return true
    }),
})
