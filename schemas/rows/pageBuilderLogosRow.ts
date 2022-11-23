import { Building } from 'lucide-react'
import { defineField } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderLogosRow',
  title: 'Logos',
  type: 'object',
  icon: Building,
  // @ts-ignore
  components: {
    preview: RowDisplay,
  },
  fields: [
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        defineField({
          name: 'logo',
          type: 'reference',
          to: [{ type: 'company' }],
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
    }),
    defineField({
      name: 'rowOptions',
      type: 'rowOptions',
    }),
  ],
  preview: {
    select: {
      logos: 'logos',
      rowOptions: 'rowOptions',
    },
    prepare: ({ logos }) => ({
      title: logos.length
        ? logos.length === 1
          ? `1 Logo`
          : `${logos.length} Logos`
        : 'No logos selected',
      subtitle: 'Logos',
      media: Building,
    }),
  },
})
