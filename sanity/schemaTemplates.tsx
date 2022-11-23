import { SCHEMA_ITEMS, SchemaItem } from '../lib/constants'

const onlySchemaItems = SCHEMA_ITEMS.filter((item) => item !== 'divider')

export const schemaTemplates = (prev) => [
  ...prev,
  ...onlySchemaItems.map((schemaItem: SchemaItem) => ({
    id: [schemaItem.schemaType, `market`].join(` `),
    title: `${schemaItem.title} with Market`,
    schemaType: schemaItem.schemaType,
    parameters: [{ name: `market`, title: `Market`, type: `string` }],
    value: ({ market }) => ({ market }),
  })),
]
