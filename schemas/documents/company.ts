import { Building } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: Building,
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      logo: 'logo',
    },
    prepare: ({ title, logo }) => ({
      title,
      media: logo ?? Building,
    }),
  },
})
