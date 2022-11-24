import { defineField, defineType } from 'sanity'

// import ArrayAutocompleteAddItem from '../../sanity/components/ArrayAutocompleteAddItem'

export default defineType(
  {
    name: 'pageBuilder',
    title: 'Page Builder',
    type: 'array',
    // components: {
    //   input: ArrayAutocompleteAddItem,
    // },
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
  },
  { strict: false }
)
