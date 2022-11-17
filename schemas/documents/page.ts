import { File } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  icon: File,
  type: 'document',
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateSpecificRows',
      description:
        'When enabled, allows you to specify a date range to display each Row in the Page Builder',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      media: File,
    }),
  },
})
