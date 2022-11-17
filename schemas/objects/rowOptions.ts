import { defineField, SanityDocument } from 'sanity'

export type RowOptions = {
  _type: 'rowOptions'
  displayFrom: 'string'
  displayTo: 'string'
}

export default defineField({
  name: 'rowOptions',
  title: 'Row options',
  type: 'object',
  options: { columns: 2 },
  // Warn if the document has not enabled date-specific rows, but there are options set
  validation: (rule) =>
    rule
      .custom((value: RowOptions, context) => {
        const { dateSpecificRows } = context.document

        return !dateSpecificRows && (value?.displayFrom || value?.displayTo)
          ? `This page does not support date-specific rows, these values should be removed`
          : true
      })
      .warning(),
  // Hide if the document has not enabled date-specific rows and there are no options set
  hidden: ({
    value,
    document,
  }: {
    value: RowOptions
    document: SanityDocument
  }) =>
    (!value?.displayFrom || !value?.displayTo) && !document.dateSpecificRows,
  fields: [
    defineField({
      name: 'displayFrom',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, { parent }) => {
          const { displayTo } = parent as RowOptions
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
          const { displayFrom } = parent as RowOptions
          return value && displayFrom && new Date(value) < new Date(displayFrom)
            ? `"Display to" must be after "display from"`
            : true
        }),
    }),
  ],
})
