import { defineField } from 'sanity'

import { MARKETS, SCHEMA_ITEMS } from '../../lib/constants'

export default defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  // TODO: Hide field completely once initial value templates are configured
  hidden: ({ document, value }) => {
    const market = MARKETS.find((m) => m.name === document?.market)

    // Hide on singleton documents
    const schemaIsSingleton = SCHEMA_ITEMS.find(
      (s) => s.kind === 'singleton' && s.schemaType === document._type
    )

    if (schemaIsSingleton) {
      return true
    }

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

      // Not required on singleton documents
      const schemaIsSingleton = SCHEMA_ITEMS.find(
        (s) => s.kind === 'singleton' && s.schemaType === document._type
      )

      if (!schemaIsSingleton && market && market.languages.length > 1) {
        return `Documents in the "${market.title}" Market require a language field`
      }

      if (value && !market.languages.find((l) => l.id === value)) {
        return `Invalid language "${value}", must be one of ${market.languages
          .map((l) => l.id)
          .join(', ')}`
      }

      return true
    }),
})
