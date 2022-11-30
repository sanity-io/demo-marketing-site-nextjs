import { CalendarIcon, ComposeIcon, LinkIcon } from '@sanity/icons'
import { Star } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'promotion',
  type: 'document',
  icon: Star,
  components: {
    preview: RowDisplay,
  },
  fieldsets: [{ name: 'display', title: 'Display', options: { columns: 2 } }],
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon, default: true },
    { name: 'links', title: 'Links', icon: LinkIcon },
    { name: 'visibility', title: 'Visibility', icon: CalendarIcon },
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
      visibility: 'visibility',
    },
    // prepare: ({ title }) => ({
    //   title,
    //   subtitle: 'Promotion',
    //   icon: Star,
    // }),
  },
})
