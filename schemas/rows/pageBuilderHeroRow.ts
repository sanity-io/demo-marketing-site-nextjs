import { Type } from 'lucide-react'
import { defineField } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderHeroRow',
  title: 'Hero',
  type: 'object',
  icon: Type,
  components: {
    preview: RowDisplay,
  },
  fields: [
    defineField({
      name: 'hero',
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
    defineField({
      name: 'rowOptions',
      type: 'rowOptions',
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      rowOptions: 'rowOptions',
    },
    // Don't use `prepare` here because our custom component handles it!
  },
})
