import { Type } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageBuilderHero',
  title: 'Hero',
  type: 'document',
  icon: Type,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
})
