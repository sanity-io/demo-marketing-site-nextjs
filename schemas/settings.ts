import { CogIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'title',
      description: 'This field is the title of your site.',
      title: 'Title',
      type: 'string',
      initialValue: 'Marketing Site.',
      validation: (rule) => rule.required(),
    },
  ],
})
