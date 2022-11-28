import { Type } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageBuilderHero',
  title: 'Hero',
  type: 'document',
  icon: Type,
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
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
