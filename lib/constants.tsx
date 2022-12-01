import {
  Building,
  ChevronRight,
  Cog,
  File,
  Home,
  Menu,
  Puzzle,
  Quote,
  User,
} from 'lucide-react'

import { markets, uniqueLanguages } from './markets'

export const CMS_NAME = 'Sanity.io'
export const CMS_URL = 'https://sanity.io/'

export const SHOW_GLOBAL = true

export type Language = {
  id: string
  title: string
}

export type Market = {
  name: string
  flag: string
  title: string
  languages: Language[]
}

export const MARKETS: Market[] = markets

export const UNIQUE_LANGUAGES = uniqueLanguages

export type SchemaItem = {
  kind: 'list'
  schemaType: string
  title: string
  icon: (props) => JSX.Element
}

export type SchemaSingleton = {
  kind: 'singleton'
  schemaType: string
  title: string
  icon: (props) => JSX.Element
}

export type SchemaDivider = {
  kind: 'divider'
}

// This studio uses helper function to loop over these objects
// As they're used to dynamically generate per-market schema items
// With the helper functions defined in lib/structure.tsx
export const SCHEMA_ITEMS: (SchemaItem | SchemaSingleton | SchemaDivider)[] = [
  { kind: 'singleton', schemaType: `page`, title: 'Home', icon: Home },
  { kind: 'list', schemaType: `page`, title: 'Pages', icon: File },
  { kind: 'divider' },
  { kind: 'list', schemaType: `article`, title: 'Articles', icon: Puzzle },
  { kind: 'divider' },
  { kind: 'list', schemaType: `person`, title: 'People', icon: User },
  { kind: 'list', schemaType: `company`, title: 'Companies', icon: Building },
  { kind: 'list', schemaType: `quote`, title: 'Quotes', icon: Quote },
  { kind: 'divider' },
  { kind: 'singleton', schemaType: `settings`, title: 'Settings', icon: Cog },
  { kind: 'singleton', schemaType: `menu`, title: 'Menus', icon: Menu },
  {
    kind: 'list',
    schemaType: `redirect`,
    title: 'Redirects',
    icon: ChevronRight,
  },
]
