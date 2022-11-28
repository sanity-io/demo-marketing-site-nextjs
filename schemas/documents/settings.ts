import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'language',
      type: 'language',
    }),
    defineField({
      name: 'title',
      description: 'This field is the title of your site.',
      type: 'internationalizedArrayString',
    }),
    // defineField({
    //   name: 'reference',
    //   type: 'reference',
    //   to: [{ type: 'page' }],
    //   options: {
    //     filter: ({ document }) => {
    //       if (!document.market) {
    //         return {
    //           filter: '!defined(market)',
    //         }
    //       }

    //       return {
    //         filter: `market == $market`,
    //         params: { market: document.market },
    //       }
    //     },
    //   },
    // }),
    // defineField({
    //   name: 'home',
    //   description: 'Which page is the home page',
    //   type: 'internationalizedArrayString',
    // }),
  ],
})
