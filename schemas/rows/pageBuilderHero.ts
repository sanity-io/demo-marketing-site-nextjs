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
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
