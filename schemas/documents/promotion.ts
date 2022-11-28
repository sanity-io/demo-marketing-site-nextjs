import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promotion',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
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
