import {defineField} from 'sanity'

import {MARKETS, SCHEMA_ITEMS} from '../../lib/constants'
import { uniqueLanguages } from '../../lib/markets'

export default defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  // TODO: Hide field completely once initial value templates are configured
  hidden: ({document, value}) => {
    const market = MARKETS.find((m) => m.name === document?.market)

    // Value is invalid for this market, show the field
    if (value && !market.languages.find((l) => l.id === value)) {
      return false
    }

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
  // But unlock if it's invalid
  readOnly: (({value, document}) => {
    const market = MARKETS.find((m) => m.name === document?.market)

    // Value is invalid for this market, show the field
    if (value && market && !market.languages.find((l) => l.id === value)) {
      return false
    }

    return true
  }),
  // Only allow language selection from the unique language codes from all the unique market-language combinations
  options: {
    list: Array.from(new Set(uniqueLanguages.map(lang => lang.split(`-`)[0]))).map(lang => ({
value: lang,
title: lang.toUpperCase()
    }))
  },
  // Only required if this market has more than one language
  validation: (Rule) =>
    Rule.custom((value, {document}) => {
      const market = MARKETS.find((m) => m.name === document?.market)

      // Not required on singleton documents
      const schemaIsSingleton = SCHEMA_ITEMS.find(
        (s) => s.kind === 'singleton' && s.schemaType === document._type
      )

      if (
        !value &&
        !schemaIsSingleton &&
        market &&
        market.languages.length > 1
      ) {
        return `Documents in the "${market.title}" Market require a language field`
      }

      if (value && !market.languages.find((l) => l.id === value)) {
        return `Invalid language "${value}", must be one of ${market.languages
          .map((l) => `"${l.id}"`)
          .join(', ')}`
      }

      return true
    }),
})
