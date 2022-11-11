import { defineField, defineType } from 'sanity'

export default defineField({
  name: 'rowOptions',
  title: 'Row options',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({
      name: 'displayFrom',
      type: 'datetime',
    }),
    defineField({
      name: 'displayTo',
      type: 'datetime',
    }),
  ],
})
