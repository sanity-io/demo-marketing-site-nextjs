import { CalendarIcon, ComposeIcon, LinkIcon, SearchIcon } from '@sanity/icons'
import delve from 'dlv'
import { Puzzle } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: Puzzle,
  components: {
    preview: RowDisplay,
  },
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon, default: true },
    { name: 'links', title: 'Links', icon: LinkIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
    { name: 'visibility', title: 'Visibility', icon: CalendarIcon },
  ],
  fields: [
    defineField({
      name: 'market',
      type: 'market',
      group: ['content'],
    }),
    defineField({
      name: 'icon',
      description: 'Displays when Articles are grouped into columns on Pages',
      type: 'icon',
      group: ['content'],
    }),
    defineField({
      name: 'language',
      type: 'language',
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
      name: 'summary',
      type: 'portableTextSimple',
      group: ['content'],
    }),
    defineField({
      name: 'slug',
      description:
        'If given, this article will become a standalone page at /articles/{slug}',
      type: 'slug',
      group: ['seo'],
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      hidden: ({ document }) => !delve(document, 'slug.current'),
      group: ['seo'],
    }),
    defineField({
      name: 'content',
      description: 'Used if this Article is a standalone page',
      type: 'portableText',
      hidden: ({ document }) => !delve(document, 'slug.current'),
      group: ['content'],
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
      group: ['content'],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: ['content'],
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
      image: 'image',
      visibility: 'visibility',
      media: 'image',
    },
    // Using prepare will override the custom preview component
    // prepare({ title, image }) {
    //   return {
    //     title,
    //     subtitle: 'Hero',
    //     media: image ?? Type
    //   }
    // }
  },
})
