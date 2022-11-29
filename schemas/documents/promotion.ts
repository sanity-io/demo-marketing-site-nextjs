import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promotion',
  type: 'document',
  icon: Star,
  fieldsets: [
    {name: 'display', title: 'Display', options: { columns: 2 }}
  ],
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'links', title: 'Links'},
    {name: 'visibility', title: 'Visibility'},
  ],
  fields: [
    defineField({
      name: 'market',
      type: 'market',
      group: ['content']
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: ['content']
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      group: ['content']
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 3,
      group: ['content']
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['content']
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      group: ['links']
    }),
    defineField({
      name: 'displayFrom',
      type: 'datetime',
      fieldset: 'display',
      group: ['visibility'],
      validation: (rule) =>
        rule.custom((value, { document }) => {
          const { displayTo } = document
          return value &&
            displayTo &&
            typeof displayTo === 'string' &&
            new Date(value) > new Date(displayTo)
            ? `"Display from" must be before "display to"`
            : true
        }),
    }),
    defineField({
      name: 'displayTo',
      type: 'datetime',
      fieldset: 'display',
      group: ['visibility'],
      validation: (rule) =>
        rule.custom((value, { document }) => {
          const { displayFrom } = document
          return value &&
            displayFrom &&
            typeof displayFrom === 'string' &&
            new Date(value) < new Date(displayFrom)
            ? `"Display to" must be after "display from"`
            : true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Promotion',
      icon: Star,
    }),
  },
})
