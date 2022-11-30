import { Type } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: Type,
  components: {
    preview: RowDisplay,
  },
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
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'portableText',
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
    defineField({
      name: 'visibility',
      type: 'visibility',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      visibility: 'visibility',
      media: 'image'
    },
    // Using prepare will override the custom preview component
    // prepare({ title, image }) {
    //   return {
    //     title,
    //     subtitle: 'Hero',
    //     media: image ?? Type
    //   }
    // }
  }
})
