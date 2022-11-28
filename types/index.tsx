import { KeyedObject } from 'sanity'

export interface AuthorProps {
  name: string
  picture: any
}

export type PageBuilderHero = KeyedObject & {
  _type: 'hero'
  title: string
}

export type PageBuilderExperiment = KeyedObject & {
  _type: 'experiment'
  title: string
}

export interface PageStubProps {
  _id: string
  title: string
  slug: string
}
export interface PageProps {
  title: string
  market?: string
  slug?: string
  content?: (PageBuilderHero | PageBuilderExperiment)[]
  translations?: {
    title: string
    slug: string
    language: string
  }[]
}

export type Link = {
  text?: string
  url?: string
  reference?: {
    slug?: string
    title?: string
  }
}
export interface GlobalDataProps {
  settings: {
    title: string
  }
  menus: {
    headerPrimary: {
      _key: string
      link: Link
      children: Link[]
    }[]
  }
}

export type PageQueryParams = {
  slug: string
  market: string
  language: string | null
  audience: 0 | 1
  date: string | null
}
