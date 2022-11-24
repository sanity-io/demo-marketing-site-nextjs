import { defineField } from 'sanity'

import { MARKETS } from '../../lib/constants'

export default defineField({
  name: 'market',
  title: 'Market',
  description:
    'Used to colocate documents to only those in the same "Market", not to be confused with "Language".',
  type: 'string',
  hidden: ({ value }) => value,
  validation: (Rule) => Rule.required(),
  options: {
    list: MARKETS.map((market) => ({
      value: market.name,
      title: market.title,
    })),
  },
})
