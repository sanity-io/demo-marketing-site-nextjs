import {defineType} from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [{type: 'block'}],
})
