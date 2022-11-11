import { ConfigContext } from 'sanity'
import {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

//   import Flag from './components/Flag'
import { Market, MARKETS, SCHEMA_ITEMS, SchemaItem } from './constants'
import { getPreviewUrl } from './getPreviewUrl'

// Create Items for all Markets
const createAllMarketItems = (S: StructureBuilder, context: ConfigContext) =>
  MARKETS.map((market) => createMarketItem(market, S, context))

// Create an Item for a market
const createMarketItem = (
  market: Market,
  S: StructureBuilder,
  config: ConfigContext
) =>
  S.listItem()
    .id(`${market.name.toLowerCase()}-market`)
    .title(market.title)
    .icon(() => <span>{market.flag}</span>)
    .child(
      S.list()
        .title(`${market.name} Market Content`)
        .items(createAllSchemaItems(market, S, config))
    )

// Create a list for each Schema in the Market
const createAllSchemaItems = (
  market: Market,
  S: StructureBuilder,
  config: ConfigContext
) => SCHEMA_ITEMS.map((schemaItem) => createSchemaItem(market, schemaItem, S))

// Create a schema item for this market for this schema type
const createSchemaItem = (
  market: Market,
  schemaItem: SchemaItem,
  S: StructureBuilder
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
        .child(
          S.documentTypeList(schemaItem.schemaType)
            .title(`${market.name} ${schemaItem.title}`)
            .filter(
              `_type == $schemaType && (!defined(market) || market == $market)`
            )
            // TODO: Replace when market is added by initial value template
            // .filter(`_type == $schemaType && market == $market`)
            .params({
              schemaType: schemaItem.schemaType,
              market: market.name,
            })
            .initialValueTemplates([
              S.initialValueTemplateItem(schemaItem.schemaType, {
                market: market.name,
              }),
            ])
        )
}

export const structure: StructureResolver = (S, context) =>
  S.list().id('root').title('Markets').items(createAllMarketItems(S, context))

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
            reload: {
              button: true,
              revision: true,
            },
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
