import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType(
  {
    name: 'pageBuilder',
    title: 'Page Builder',
    type: 'array',
    of: [
      defineField({
        name: 'hero',
        title: 'Hero',
        type: 'reference',
        to: [{ type: 'hero' }],
        options: {
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
        name: 'experiment',
        title: 'Experiment',
        type: 'pageBuilderExperimentCell',
      }),
      defineField({
        name: 'logos',
        title: 'Logos',
        type: 'pageBuilderLogosCell',
      }),
      defineField({
        name: 'quote',
        title: 'Quote',
        type: 'reference',
        to: [{ type: 'quote' }],
        options: {
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
        name: 'promotion',
        title: 'Promotion',
        type: 'reference',
        to: [{ type: 'promotion' }],
        options: {
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
  },
  { strict: false }
)
