import {SplitHorizontalIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'intermission',
  title: 'Intermission',
  icon: SplitHorizontalIcon,
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'NOT DISPLAYED IN FRONTEND',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'statements',
      title: 'Statements',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}],
          },
          styles: [{title: 'Normal', value: 'normal'}],
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'background',
      title: 'Background',
      fields: [
        defineField({
          type: 'string',
          name: 'mediaType',
          title: 'Media type',
          options: {
            layout: 'radio',
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
              {title: 'None', value: undefined},
            ],
          },
        }),
        defineField({
          type: 'mux.video',
          name: 'video',
          title: 'Video',
          hidden: ({document}: any) =>
            document?.background?.mediaType !== 'video',
        }),
        defineField({
          type: 'image',
          name: 'image',
          title: 'Image',
          hidden: ({document}: any) =>
            document?.background?.mediaType !== 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, media: SplitHorizontalIcon}),
  },
})
