import { CalendarIcon, ComposeIcon, LinkIcon, SearchIcon } from '@sanity/icons'
import { Quote } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'quote',
  title: 'Quote',
  icon: Quote,
  type: 'document',
  components: {
    preview: RowDisplay,
  },
  groups: [
    { name: 'content', title: 'Content', icon: ComposeIcon, default: true },
    { name: 'visibility', title: 'Visibility', icon: CalendarIcon },
  ],
  fields: [
    defineField({
      name: 'market',
      type: 'market',
      group: ['content'],
    }),
    defineField({
      name: 'quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: ['content'],
    }),
    defineField({
      name: 'person',
      type: 'reference',
      to: [{ type: 'person' }],
      group: ['content'],
      options: {
        // Scope references to only those in the same Market
        filter: ({ document }) => {
          if (!document.market) {
            return {
              filter: '!defined(market)',
            }
          }

          return {
            filter: `market == $market`,
            params: { market: document.market },
          }
        },
      },
    }),
    defineField({
      name: 'visibility',
      type: 'visibility',
      group: ['visibility'],
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      person: 'person.name',
      company: 'person.company.name',
      media: 'person.picture',
      visibility: 'visibility',
    },
    // prepare: ({ quote, person, company, media }) => ({
    //   title: quote,
    //   subtitle: person ? `— ${person} at ${company}` : `Unknown`,
    //   media: media ?? Quote,
    // }),
  },
})
