import {Building} from 'lucide-react'
import {defineField} from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderLogosCell',
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
      description:
        'If no logos are selected, the logos of all companies in this Market will be displayed',
      type: 'array',
      of: [
        defineField({
          name: 'logo',
          type: 'reference',
          to: [{type: 'company'}],
          options: {
            // Scope references to only those in the same Market
            filter: ({document}) => {
              if (!document.market) {
                return {
                  filter: '!defined(market)',
                }
              }

              return {
                filter: `market == $market`,
                params: {market: document.market},
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'visibility',
      type: 'visibility',
    }),
  ],
  preview: {
    select: {
      logos: 'logos',
      visibility: 'visibility',
    },
    prepare: ({logos}) => {
      let title = 'All Logos'
      if (logos?.length) {
        if (logos.length === 1) {
          title = `1 Logo`
        } else {
          title = `${logos.length} Logos`
        }
      }
      return {
        title,
        subtitle: 'Logos',
        media: Building,
      }
    },
  },
})
