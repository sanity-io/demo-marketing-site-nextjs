import { Quote } from 'lucide-react'
import { defineField } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderQuoteRow',
  title: 'Quote',
  type: 'object',
  icon: Quote,
  // @ts-ignore
  components: {
    preview: RowDisplay,
  },
  fields: [
    defineField({
      name: 'quote',
      type: 'reference',
      to: [{ type: 'quote' }],
    }),
    defineField({
      name: 'rowOptions',
      type: 'rowOptions',
    }),
  ],
  preview: {
    select: {
      title: 'quote.quote',
      rowOptions: 'rowOptions',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Quote',
      media: Quote,
    }),
  },
})
