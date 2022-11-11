import { Type, Wand2 } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineField({
      name: 'hero',
      type: 'object',
      icon: Type,
      components: {
        preview: RowDisplay,
      },
      fields: [
        defineField({
          name: 'hero',
          type: 'reference',
          to: [{ type: 'pageBuilderHero' }],
        }),
        defineField({
          name: 'rowOptions',
          type: 'rowOptions',
        }),
      ],
      preview: {
        select: {
          title: 'hero.title',
          rowOptions: 'rowOptions',
        },
        // Don't use `prepare` here because our custom component handles it!
      },
    }),
    defineField({
      name: 'experiment',
      type: 'object',
      icon: Wand2,
      fields: [
        defineField({
          name: 'experiments',
          description: 'Choose 1-2 blocks to be split between A/B audiences',
          type: 'array',
          of: [
            defineField({
              name: 'experiment',
              type: 'reference',
              to: [{ type: 'pageBuilderHero' }],
            }),
          ],
          validation: (rule) => rule.max(2).required(),
        }),
        defineField({
          name: 'rowOptions',
          type: 'rowOptions',
        }),
      ],
      preview: {
        select: {
          title0: 'experiments.0.title',
          title1: 'experiments.1.title',
        },
        prepare: ({ title0, title1 }) => ({
          title: [title0, title1]
            .filter(Boolean)
            .map((title) => `"${title}"`)
            .join(` vs `),
          subtitle: 'Experiment',
          media: Wand2,
        }),
      },
    }),
  ],
})
