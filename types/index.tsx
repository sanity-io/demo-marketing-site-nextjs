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
export interface PageProps {
  title: string
  slug?: string
  content?: (PageBuilderHero | PageBuilderExperiment)[]
}

export type PageQueryParams = {
  slug: string
  market: string
  audience: 0 | 1
  date: string | null
}
