import { Wand2 } from 'lucide-react'
import { defineField } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderExperimentRow',
  title: 'Experiment',
  type: 'object',
  icon: Wand2,
  // @ts-ignore
  components: {
    preview: RowDisplay,
  },
  fields: [
    defineField({
      name: 'experiments',
      description: 'Choose 1-2 blocks to be split between A/B audiences',
      type: 'array',
      of: [
        defineField({
          name: 'experiment',
          type: 'reference',
          to: [{ type: 'pageBuilderHero' }],
          options: {
            // Scope references to only those in the same Market
            filter: ({ document }) => {
              if (!document.market) {
                return {
                  filter: '!defined(market)',
                }
              }

              return {
                filter: `market == $market`,
                params: { market: document.market },
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.max(2).required(),
    }),
    defineField({
      name: 'rowOptions',
      type: 'rowOptions',
    }),
  ],
  preview: {
    select: {
      title0: 'experiments.0.title',
      title1: 'experiments.1.title',
    },
    prepare: ({ title0, title1 }) => ({
      title:
        title0 || title1
          ? [title0, title1]
              .filter(Boolean)
              .map((title) => `"${title}"`)
              .join(` vs `)
          : `No "Heroes" selected`,
      subtitle: 'Experiment',
      media: Wand2,
    }),
  },
})
