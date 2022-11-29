import { defineField, defineType } from 'sanity'

export default defineType(
  {
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
      defineField({
        name: 'promotion',
        title: 'Promotion',
        type: 'reference',
        to: [{ type: 'promotion' }],
      }),
    ],
  },
  { strict: false }
)
