import {
  Building,
  File,
  Quote,
  User,
} from 'lucide-react'

import {markets, uniqueLanguages} from './markets'

export const CMS_NAME = 'Sanity.io'
export const CMS_URL = 'https://sanity.io/'

export const SHOW_GLOBAL = true

export type Market = {
  name: string
  flag: string
  title: string
  languages: string[]
}

export const MARKETS: Market[] = markets

export const UNIQUE_LANGUAGES = uniqueLanguages

export type SchemaItem = {
  schemaType: string
  title: string
  icon: (props) => JSX.Element
}

export type SchemaDivider = 'divider'

// This studio uses helper function to loop over these objects
// As they're used to dynamically generate per-market schema items
// With the helper functions defined in lib/structure.tsx
export const SCHEMA_ITEMS: (SchemaItem | SchemaDivider)[] = [
  { schemaType: `page`, title: 'Pages', icon: File },
  'divider',
  { schemaType: `person`, title: 'People', icon: User },
  { schemaType: `company`, title: 'Companies', icon: Building },
  { schemaType: `quote`, title: 'Quotes', icon: Quote },
]
