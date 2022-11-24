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
  ],
})
