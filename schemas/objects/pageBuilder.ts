import { Type, Wand2 } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineField({
      name: 'hero',
      type: 'pageBuilderHeroRow',
    }),
    defineField({
      name: 'experiment',
      type: 'pageBuilderExperimentRow',
    }),
    defineField({
      name: 'logos',
      type: 'pageBuilderLogosRow',
    }),
    defineField({
      name: 'quote',
      type: 'pageBuilderQuoteRow',
    }),
  ],
})
