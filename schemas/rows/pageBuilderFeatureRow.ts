import { Star } from 'lucide-react'
import { defineField } from 'sanity'

import RowDisplay from '../components/RowDisplay'

export default defineField({
  name: 'pageBuilderFeatureRow',
  title: 'Feature',
  type: 'object',
  icon: Star,
  // @ts-ignore
  components: {
    preview: RowDisplay,
  },
  fields: [
    defineField({
      name: 'features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'text', rows: 3 }),
            defineField({ name: 'subtitle', type: 'text', rows: 3 }),
            defineField({ name: 'image', type: 'image' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'rowOptions',
      type: 'rowOptions',
    }),
  ],
  preview: {
    select: {
      features: 'features',
    },
    prepare: ({ features }) => ({
      title: features?.length
        ? features.length === 1
          ? `1 Feature`
          : `${features.length} Features`
        : `No Features`,
      subtitle: 'Features',
      media: Star,
    }),
  },
})
