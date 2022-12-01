/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig, defineField } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { media } from 'sanity-plugin-media'

import { MARKETS, SCHEMA_ITEMS } from './lib/constants'
import { markets } from './lib/markets'
import { marketBadge } from './sanity/badges/market-badge'
import CustomToolMenu from './sanity/components/CustomToolMenu'
import Icon from './sanity/components/Icon'
import { schemaTemplates } from './sanity/schemaTemplates'
import { structure } from './sanity/structure'
import { defaultDocumentNode } from './sanity/structure/defaultDocumentNode'
import { schemaTypes } from './schemas'
import settingsType from './schemas/documents/settings'

const BASE_PATH = '/studio'

const pluginsBase = (marketName?: string) => {
  const market = MARKETS.find((m) => m.name === marketName)

  // Shared plugins across all "market" configs
  const base = [
    deskTool({
      structure: (S, context) => structure(S, context, marketName),
      defaultDocumentNode,
    }),
    unsplashImageAsset(),
    visionTool({ defaultApiVersion: '2022-08-08' }),
    media(),
    // Used for field-level translation in some schemas
    internationalizedArray({
      languages: market ? market.languages : [],
      fieldTypes: ['string'],
    }),
  ]

  const i18nSchemaTypes = SCHEMA_ITEMS.map((item) =>
    item.kind === 'list' ? item.schemaType : null
  ).filter(Boolean)

  if (market && market.languages.length > 1) {
    // Used for document-level translation on some schema types
    // If there is more than 1 language
    base.push(
      documentInternationalization({
        supportedLanguages: market.languages,
        schemaTypes: i18nSchemaTypes,
      })
    )
  } else if (!market) {
    const uniqueLanguages = MARKETS.reduce((acc, cur) => {
      const newLanguages = cur.languages.filter(
        (lang) => !acc.find((a) => a.id === lang.id)
      )

      return [...acc, ...newLanguages]
    }, [])

    base.push(
      documentInternationalization({
        supportedLanguages: uniqueLanguages,
        schemaTypes: i18nSchemaTypes,
      })
    )
  }

  return base
}

// Shared config across all "market" configs
// Some elements are overwritten in the market-specific configs
const configBase = {
  basePath: BASE_PATH + `/global`,
  name: 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Marketing.',
  icon: Icon,
  schema: {
    types: schemaTypes,
    templates: (prev) => schemaTemplates(prev),
  },
  plugins: pluginsBase(),
  document: {
    badges: (prev) => [
      ...prev,
      (props) => marketBadge(props, MARKETS, `market`),
    ],
    // Hide 'Settings' from new document options
    // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== settingsType.name
        )
      }
      return prev
    },
  },
  studio: {
    components: {
      toolMenu: CustomToolMenu,
    },
  },
}

export default defineConfig([
  ...MARKETS.map((market) => ({
    ...configBase,
    basePath: BASE_PATH + `/` + market.name.toLowerCase(),
    name: market.name,
    title: [configBase.title, market.title].join(` `),
    plugins: pluginsBase(market.name),
    icon: () => Icon(market),
  })),
  configBase,
])
