import { Menu } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menu',
  type: 'document',
  icon: Menu,
  title: 'Menu',
  fields: [
    defineField({
      name: 'market',
      type: 'market',
    }),
    defineField({
      name: 'headerPrimary',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'link',
              type: 'link',
            }),
            defineField({
              name: 'children',
              type: 'array',
              of: [
                defineField({
                  name: 'link',
                  type: 'object',
                  fields: [{ name: 'link', type: 'link' }],
                  preview: {
                    select: {
                      title: 'link.text',
                      url: 'link.link',
                      ref: 'link.reference.slug.current',
                    },
                    prepare({ title, url, ref }) {
                      return {
                        title,
                        subtitle: ref ?? url,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              children: 'children',
              text: 'link.text',
              url: 'link.link',
              ref: 'link.reference.slug.current',
            },
            prepare(selection) {
              const { children, text, url, ref } = selection

              return {
                title: text,
                // eslint-disable-next-line no-nested-ternary
                subtitle: children
                  ? children.length === 1
                    ? `${children.length} Child Link`
                    : `${children.length} Child Links`
                  : ref ?? url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'headerSecondary',
      type: 'array',
      of: [{ name: 'link', type: 'link' }],
    }),
    defineField({
      name: 'footer',
      type: 'array',
      of: [{ name: 'link', type: 'link' }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menus',
      }
    },
  },
})
