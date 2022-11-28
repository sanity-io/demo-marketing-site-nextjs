import { Star } from 'lucide-react'
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
      // defineField({
      //   name: 'feature',
      //   type: 'pageBuilderFeatureRow',
      // }),
      defineField({
        name: 'feature',
        type: 'object',
        icon: Star,
        fields: [
          defineField({ name: 'title', type: 'string', }),
          defineField({ name: 'subtitle', type: 'text', rows: 3 }),
          defineField({ name: 'image', type: 'image' }),
        ],
      }),
    ],
  },
  { strict: false }
)
