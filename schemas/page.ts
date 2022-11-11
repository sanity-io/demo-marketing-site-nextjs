import { File } from 'lucide-react'
import { defineType } from 'sanity'

import { MARKETS } from '../lib/constants'

export default defineType({
  name: 'page',
  title: 'Page',
  icon: File,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'market',
      type: 'string',
      //   readOnly: true,
      validation: (Rule) => Rule.required(),
      options: {
        list: MARKETS.map((market) => ({
          value: market.name,
          title: market.title,
        })),
      },
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      type: 'pageBuilder',
    },
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
