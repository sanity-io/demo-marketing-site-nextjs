import { SCHEMA_ITEMS, SchemaItem } from '../lib/constants'

const onlySchemaItems = SCHEMA_ITEMS.filter((item) => item.kind === 'list')

export const schemaTemplates = (prev) => [
  ...prev,
  ...onlySchemaItems.map((schemaItem: SchemaItem) => ({
    id: [schemaItem.schemaType, `market`].join(`-`),
    title: `${schemaItem.title} with Market`,
    type: 'initialValueTemplateItem',
    schemaType: schemaItem.schemaType,
    parameters: [{ name: `market`, title: `Market`, type: `string` }],
    value: ({ market }) => ({ market }),
  })),
]
