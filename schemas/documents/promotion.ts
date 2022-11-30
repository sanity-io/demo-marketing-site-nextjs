import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promotion',
  type: 'document',
  icon: Star,
  fieldsets: [{ name: 'display', title: 'Display', options: { columns: 2 } }],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'links', title: 'Links' },
    { name: 'visibility', title: 'Visibility' },
  ],
  fields: [
    defineField({
      name: 'market',
      type: 'market',
      group: ['content'],
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: ['content'],
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      group: ['content'],
    }),
    defineField({
      name: 'content',
      type: 'text',
      rows: 3,
      group: ['content'],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['content'],
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
      group: ['links'],
    }),
    defineField({
      name: 'visibility',
      type: 'visibility',
      group: ['visibility'],
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
