import {RemoveIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType(
  {
    name: 'pageBuilder',
    title: 'Page Builder',
    type: 'array',
    validation: (rule) => rule.unique(),
    of: [
      defineArrayMember({
        name: 'article',
        title: 'Article',
        type: 'reference',
        to: [{type: 'article'}],
        options: {
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
      defineArrayMember({
        name: 'experiment',
        title: 'Experiment',
        type: 'pageBuilderExperimentCell',
      }),
      defineArrayMember({
        name: 'logos',
        title: 'Logos',
        type: 'pageBuilderLogosCell',
      }),
      defineArrayMember({
        name: 'quote',
        title: 'Quote',
        type: 'reference',
        to: [{type: 'quote'}],
        options: {
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
      defineArrayMember({
        name: 'infoBreak',
        title: 'Info break',
        icon: RemoveIcon,
        description: 'Added to make it easier to test bento groups',
        type: 'object',
        fields: [
          defineField({
            type: 'string',
            name: 'text',
          }),
        ],
        preview: {
          select: {
            title: 'text',
          },
          prepare({title}) {
            return {
              title: title || 'Break',
              media: RemoveIcon,
            }
          },
        },
      }),
    ],
  },
  {strict: false}
)
