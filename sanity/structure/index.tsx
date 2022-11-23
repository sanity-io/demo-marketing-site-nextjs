import { ConfigContext } from 'sanity'
import {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

//   import Flag from './components/Flag'
import {
  Language,
  Market,
  MARKETS,
  SCHEMA_ITEMS,
  SchemaDivider,
  SchemaItem,
} from '../../lib/constants'
import Icon from '../components/Icon'
import OGPreview from '../components/OGPreview'
import { getOgUrl } from './getOgUrl'
import { getPreviewUrl } from './getPreviewUrl'

// Create Items for all Markets
const createAllMarketItems = (S: StructureBuilder, config: ConfigContext) =>
  MARKETS.map((market) => createMarketItem(S, config, market))

// Create an Item for a market
const createMarketItem = (
  S: StructureBuilder,
  config: ConfigContext,
  market: Market
) =>
  S.listItem()
    .id(`${market.name.toLowerCase()}-market`)
    .title(market.title)
    .icon(() => Icon(market))
    .child(
      S.list()
        .title(`${market.name} Market Content`)
        .items(createAllSchemaItems(S, config, market))
    )

// Create a list for each Schema in the Market
const createAllSchemaItems = (
  S: StructureBuilder,
  config: ConfigContext,
  market: Market
) => SCHEMA_ITEMS.map((schemaItem) => createSchemaItem(S, schemaItem, market))

// Create a schema item for this market for this schema type
const createSchemaItem = (
  S: StructureBuilder,
  schemaItem: SchemaItem | SchemaDivider,
  market: Market
) => {
  return schemaItem === 'divider'
    ? S.divider()
    : S.listItem()
        .id(
          `${market.name.toLowerCase()}-${schemaItem.title
            .toLowerCase()
            .replaceAll(` `, `-`)}`
        )
        .title(schemaItem.title)
        .icon(schemaItem.icon)
        .child(createSchemaItemChildren(S, schemaItem, market))
}

const createSchemaItemChildren = (
  S: StructureBuilder,
  schemaItem: SchemaItem,
  market: Market
) => {
  const itemTitle = [market.name, schemaItem.title].filter(Boolean).join(` `)

  return market.languages.length > 1
    ? S.list()
        .title(itemTitle)
        .items([
          // Create an item for every language
          ...market.languages.map((language) =>
            createSchemaItemList(S, schemaItem, market, language)
          ),
          // And one for no set language
          createSchemaItemList(S, schemaItem, market, null),
        ])
    : createSchemaItemChild(S, schemaItem, market, null, itemTitle)
}

const createSchemaItemChild = (
  S: StructureBuilder,
  schemaItem: SchemaItem,
  market: Market,
  language: Language | null,
  itemTitle: string
) => {
  let languageQuery = ``
  if (language) {
    // If language was supplied, use it
    languageQuery = `language == $language`
  } else if (!language && market.languages.length > 1) {
    // If no language, but the market has multiple, show documents with no set language
    languageQuery = `!defined(language)`
  } else {
    // No language in a single language market, don't filter by language
    languageQuery = ``
  }

  return S.documentList()
    .title(itemTitle)
    .schemaType(schemaItem.schemaType)
    .filter(
      [
        `_type == $schemaType`,
        // TODO: Replace when market is added by initial value template
        // `market == $market`,
        `(!defined(market) || market == $market)`,
        languageQuery,
      ]
        .filter(Boolean)
        .join(` && `)
    )
    .params({
      schemaType: schemaItem.schemaType,
      market: market.name,
      language: language?.id ?? null,
    })
    .initialValueTemplates([
      S.initialValueTemplateItem(schemaItem.schemaType, {
        market: market.name,
      }),
    ])
}

const createSchemaItemList = (
  S: StructureBuilder,
  schemaItem: SchemaItem,
  market: Market,
  language: Language | null
) => {
  const itemTitle = [
    market.name,
    schemaItem.title,
    language?.id
      ? `(${language.id.toUpperCase()})`
      : market.languages.length > 1
      ? `(No Language)`
      : null,
  ]
    .filter(Boolean)
    .join(` `)

  return S.listItem()
    .title(itemTitle)
    .icon(schemaItem.icon)
    .child(createSchemaItemChild(S, schemaItem, market, language, itemTitle))
}

export const structure = (
  S: StructureBuilder,
  context: ConfigContext,
  marketName?: string
) => {
  const market = marketName
    ? MARKETS.find((market) => market.name === marketName)
    : null

  if (market) {
    return S.list()
      .id(`${market.name.toLowerCase()}-root`)
      .title(`${market.name} Market`)
      .items(createAllSchemaItems(S, context, market))
  }

  return S.list()
    .id('root')
    .title('Markets')
    .items(createAllMarketItems(S, context))
}

// `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
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
    default:
      return S.document().views([S.view.form()])
  }
}
