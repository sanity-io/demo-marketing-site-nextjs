import author from './author'
import pageBuilder from './objects/pageBuilder'
import rowOptions from './objects/rowOptions'
import page from './page'
import post from './post'
import pageBuilderHero from './rows/pageBuilderHero'
import settings from './settings'

export const schemaTypes = [
  post,
  page,
  author,
  settings,
  pageBuilder,
  pageBuilderHero,
  rowOptions,
]
