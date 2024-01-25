import {ConfigContext} from 'sanity'
import {StructureBuilder} from 'sanity/structure'

import {
  Language,
  Market,
  MARKETS,
  SCHEMA_ITEMS,
  SchemaDivider,
  SchemaItem,
  SchemaSingleton,
} from '../../lib/constants'
import Icon from '../components/Icon'
import {sanityConfig} from '../config'

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
  schemaItem: SchemaItem | SchemaSingleton | SchemaDivider,
  market: Market
) => {
  switch (schemaItem.kind) {
    case 'divider':
      return S.divider()
    case 'list':
      return S.listItem()
        .id(
          [
            market.name.toLowerCase(),
            schemaItem.title.toLowerCase().replaceAll(` `, `-`),
          ].join(`-`)
        )
        .title(schemaItem.title)
        .icon(schemaItem.icon)
        .child(createSchemaItemChildren(S, schemaItem, market))
    case 'singleton':
      return S.listItem()
        .icon(schemaItem.icon)
        .id([market.name.toLowerCase(), schemaItem.schemaType].join(`-`))
        .schemaType(schemaItem.schemaType)
        .title([market.name, schemaItem.title].join(` `))
        .child(
          S.defaultDocument({
            documentId: [market.name, schemaItem.schemaType].join(`-`),
            schemaType: schemaItem.schemaType,
          }).documentId(
            [market.name.toLowerCase(), schemaItem.schemaType].join(`-`)
          )
        )
    default:
      return null
  }
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

  return S.documentTypeList(schemaItem.schemaType)
    .title(itemTitle)
    .filter(
      [
        `_type == $schemaType`,
        // TODO: Replace when market is added by initial value template
        `market == $market`,
        // `(!defined(market) || market == $market)`,
        languageQuery,
      ]
        .filter(Boolean)
        .join(` && `)
    )
    .apiVersion(sanityConfig.apiVersion || '2022-08-08')
    .params({
      schemaType: schemaItem.schemaType,
      market: market.name,
      language: language?.id ?? null,
    })
    .initialValueTemplates([
      S.initialValueTemplateItem([schemaItem.schemaType, `market`].join(`-`), {
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
  let languageTitle = null
  if (language?.id) {
    languageTitle = `(${language.id.toUpperCase()})`
  } else if (market.languages.length > 1) {
    languageTitle = `(No Language)`
  }

  const itemTitle = [market.name, schemaItem.title, languageTitle]
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
  const market = marketName ? MARKETS.find((m) => m.name === marketName) : null

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
