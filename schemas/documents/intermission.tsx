import { SplitHorizontalIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType, Rule } from 'sanity'

export default defineType({
  name: 'intermission',
  title: 'Intermission',
  icon: SplitHorizontalIcon,
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'NOT DISPLAYED IN FRONTEND',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'statements',
      title: 'Statements',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
          styles: [{ title: 'Normal', value: 'normal' }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title, media: SplitHorizontalIcon }),
  },
})
