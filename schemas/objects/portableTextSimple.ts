import {defineType} from 'sanity'

export default defineType({
  name: 'portableTextSimple',
  title: 'Portable Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [],
      },
    },
  ],
})
