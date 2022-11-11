/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, Slug } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { getProductionUrl } from './lib/getProductionUrl'
import { schemaTemplates } from './lib/schemaTemplates'
import { defaultDocumentNode, structure } from './lib/structure'
import { schemaTypes } from './schemas'

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio'

export default defineConfig({
  basePath,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
    'Next.js Marketing Site Demo',
  schema: {
    types: schemaTypes,
    // TODO: Get initial templates working
    // templates: (prev) => schemaTemplates(prev),
  },
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    unsplashImageAsset(),
    visionTool({
      defaultApiVersion: '2022-08-08',
    }),
  ],
  // TODO: Get document badge showing the `market` of the document
  // document: {
  //   badges: (prev, ctx, ...rest) => {
  //     console.log(prev, ctx, rest)

  //     return [
  //       ...prev
  //     ]
  //   }
  // }
  document: {
    // productionUrl: getProductionUrl,
    // Hide 'Settings' from new document options
    // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
    // newDocumentOptions: (prev, { creationContext }) => {
    //   if (creationContext.type === 'global') {
    //     return prev.filter(
    //       (templateItem) => templateItem.templateId !== settingsType.name
    //     )
    //   }
    //   return prev
    // },
    // Removes the "duplicate" action on the "settings" singleton
    // actions: (prev, { schemaType }) => {
    //   if (schemaType === settingsType.name) {
    //     return prev.filter(({ action }) => action !== 'duplicate')
    //   }
    //   return prev
    // },
  },
})
