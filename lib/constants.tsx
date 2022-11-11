import {
  Award,
  CreditCard,
  Feather,
  File,
  Globe,
  Grid,
  HelpCircle,
  Home,
  Image,
  Layers,
  Layout,
  Search,
  ShoppingCart,
  Star,
  Tag,
} from 'lucide-react'
import React from 'react'

export const CMS_NAME = 'Sanity.io'
export const CMS_URL = 'https://sanity.io/'

export const SHOW_GLOBAL = true

export type Market = {
  name: string
  flag: string
  title: string
  languages: string[]
}

export const MARKETS: Market[] = [
  {
    flag: `🇺🇸`,
    name: `US`,
    title: `USA`,
    languages: [`en`],
  },
  {
    flag: `🇨🇦`,
    name: `CA`,
    title: `Canada`,
    languages: [`en`, `fr-ca`],
  },
  {
    flag: `🇬🇧`,
    name: `UK`,
    title: `United Kingdom`,
    languages: [`en`],
  },
  {
    flag: `🇮🇳`,
    name: `IN`,
    title: `India`,
    languages: [`en`],
  },
  {
    flag: `🇯🇵`,
    name: `JP`,
    title: `Japan`,
    languages: [`jp`, `en`],
  },
]

export const UNIQUE_LANGUAGES = Array.from(
  new Set(MARKETS.map((market) => market.languages).flat())
)

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
  { schemaType: `post`, title: 'Posts', icon: Feather },
  'divider',
  // {schemaType: `product`, title: 'Product Listing', icon: Image},
  // {schemaType: `article`, title: 'Product Details Templates', icon: Layout},
  // {schemaType: `article`, title: 'Product Details Pages', icon: Grid},
  // {schemaType: `article`, title: 'Categories', icon: Tag},
  // {schemaType: `article`, title: 'Category Landing Page', icon: Feather},
  // 'divider',
  // {schemaType: `article`, title: 'Campaigns', icon: Award},
  // 'divider',
  // {schemaType: `article`, title: 'Home Page', icon: Home},
  // {schemaType: `article`, title: 'Cart Page', icon: ShoppingCart},
  // {schemaType: `article`, title: 'Support Page', icon: HelpCircle},
  // 'divider',
  // {schemaType: `article`, title: 'Main Footer', icon: CreditCard},
  // 'divider',
  // {schemaType: `article`, title: 'Search Redirects', icon: Search},
]
