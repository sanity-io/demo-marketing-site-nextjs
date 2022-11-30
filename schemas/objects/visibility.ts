import { defineField } from 'sanity'

export type Visibility = {
  _type: 'visibility'
  displayFrom: 'string'
  displayTo: 'string'
}

export default defineField({
  name: 'visibility',
  title: 'Visibility',
  description:
    'This document may be displayed as a Cell in a page, you can control when it is displayed here.',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({
      name: 'displayFrom',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, { parent }) => {
          const { displayTo } = parent as Visibility
          return value && displayTo && new Date(value) > new Date(displayTo)
            ? `"Display from" must be before "display to"`
            : true
        }),
    }),
    defineField({
      name: 'displayTo',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, { parent }) => {
          const { displayFrom } = parent as Visibility
          return value && displayFrom && new Date(value) < new Date(displayFrom)
            ? `"Display to" must be after "display from"`
            : true
        }),
    }),
  ],
})
