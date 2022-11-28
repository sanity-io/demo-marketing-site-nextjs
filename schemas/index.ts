

import company from './documents/company'
import menu from './documents/menu'
import page from './documents/page'
import person from './documents/person'
import quote from './documents/quote'
import redirect from './documents/redirect'
import settings from './documents/settings'
import language from './objects/language'
import link from './objects/link'
import market from './objects/market'
import pageBuilder from './objects/pageBuilder'
import rowOptions from './objects/rowOptions'
import seo from './objects/seo'
import pageBuilderExperimentRow from './rows/pageBuilderExperimentRow'
import pageBuilderHero from './rows/pageBuilderHero'
import pageBuilderHeroRow from './rows/pageBuilderHeroRow'
import pageBuilderLogosRow from './rows/pageBuilderLogosRow'
import pageBuilderQuoteRow from './rows/pageBuilderQuoteRow'

export const schemaTypes = [
  page,
  person,
  company,
  settings,
  redirect,
  menu,
  quote,
  market,
  language,
  seo,
  pageBuilder,
  pageBuilderHero,
  pageBuilderHeroRow,
  pageBuilderExperimentRow,
  pageBuilderLogosRow,
  pageBuilderQuoteRow,
  rowOptions,
  link
]
