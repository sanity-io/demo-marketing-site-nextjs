import { CogIcon, ComposeIcon, SearchIcon } from '@sanity/icons'
import { File } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  icon: File,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
    { name: 'options', title: 'Options', icon: CogIcon },
  ],
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
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'dateSpecificRows',
      description:
        'When enabled, allows you to specify a date range to display each Row in the Page Builder',
      type: 'boolean',
      initialValue: false,
      group: 'options',
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      market: 'market',
      language: 'language',
    },
    prepare: ({ title, market, language }) => {
      const subtitle = [language?.toUpperCase(), market?.toUpperCase()]
        .filter(Boolean)
        .join(' - ')

      return {
        title,
        subtitle,
        media: File,
      }
    },
  },
})
