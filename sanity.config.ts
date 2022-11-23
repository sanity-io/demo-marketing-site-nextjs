/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { MARKETS, SCHEMA_ITEMS } from './lib/constants'
import { marketBadge } from './sanity/badges/market-badge'
import Icon from './sanity/components/Icon'
import { schemaTemplates } from './sanity/schemaTemplates'
import { defaultDocumentNode, structure } from './sanity/structure'
import { schemaTypes } from './schemas'
import settingsType from './schemas/documents/settings'

// @TODO: update next-sanity/studio to automatically set this when needed
const BASE_PATH = '/studio'

const pluginsBase = (marketName?: string) => {
  const base = [
    deskTool({
      structure: (S, context) => structure(S, context, marketName),
      defaultDocumentNode,
    }),
    unsplashImageAsset(),
    visionTool({
      defaultApiVersion: '2022-08-08',
    }),
  ]

  const market = MARKETS.find((m) => m.name === marketName)

  if (market && market.languages.length > 1) {
    base.push(
      documentInternationalization({
        supportedLanguages: market.languages,
        schemaTypes: SCHEMA_ITEMS.map((item) => typeof item !== 'string' && item.schemaType).filter(Boolean),
      })
    )
  }

  return base
}

const configBase = {
  basePath: BASE_PATH + `/global`,
  name: 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Global // Marketing.',
  icon: Icon,
  schema: {
    types: schemaTypes,
    // TODO: Get initial templates working
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
}

export default defineConfig([
  ...MARKETS.map((market) => ({
    ...configBase,
    basePath: BASE_PATH + `/` + market.name.toLowerCase(),
    name: market.name,
    title: market.title,
    plugins: pluginsBase(market.name),
    icon: () => Icon(market),
  })),
  configBase,
])
