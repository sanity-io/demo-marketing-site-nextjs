import {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {Block, KeyedObject} from 'sanity'

export interface AuthorProps {
  name: string
  picture: any
}

export type PageBuilderArticle = KeyedObject & {
  _type: 'article'
  title: string
}

export type PageBuilderExperiment = KeyedObject & {
  _type: 'experiment'
  title: string
}

export type PageBuilderQuote = KeyedObject & {
  _type: 'quote'
  quote: string
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
  content?: (PageBuilderArticle | PageBuilderExperiment | PageBuilderQuote)[]
  translations?: {
    title: string
    slug: string
    language: string
  }[]
}

export type ArticleStub = {
  _type: 'article'
  title?: string
  subtitle?: string
  content?: Block[]
  summary?: Block[]
  image?: SanityImageSource
  links?: (KeyedObject & Link)[]
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
