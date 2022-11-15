import { User } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  icon: User,
  type: 'document',
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'picture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      type: 'reference',
      to: [{ type: 'company' }],
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
        }
      }
    }),
  ],
  preview: {
    select: {
      name: 'name',
      title: 'title',
      media: 'picture',
      company: 'company.name',
    },
    prepare: ({ name, title, media, company }) => ({
      title: name,
      subtitle: title ? `${title} at ${company}` : company,
      media: media ?? User,
    }),
  },
})
