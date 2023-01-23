import {Menu} from 'lucide-react'
import {defineField, defineType} from 'sanity'

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
      description: '"Mega menu" items with child links',
      type: 'array',
      of: [
        defineField({
          name: 'item',
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
                  name: 'item',
                  type: 'object',
                  fields: [{name: 'link', type: 'link'}],
                  preview: {
                    select: {
                      title: 'link.text',
                      url: 'link.url',
                      ref: 'link.reference.slug.current',
                    },
                    prepare({title, url, ref}) {
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
              refSlug: 'link.reference.slug.current',
              refTitle: 'link.reference.title',
              text: 'link.text',
              url: 'link.url',
            },
            prepare(selection) {
              const {children, refSlug, refTitle, text, url} = selection

              let subtitle
              if (children) {
                subtitle =
                  children.length === 1
                    ? `${children.length} Child Link`
                    : `${children.length} Child Links`
              } else if (refSlug) {
                subtitle = refSlug
              } else if (url) {
                subtitle = url
              }

              return {
                title: !text && !refTitle ? `Empty Text` : text ?? refTitle,
                subtitle: subtitle ?? `No link`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'headerSecondary',
      description: 'Additional links in the website Header',
      type: 'array',
      of: [{name: 'link', type: 'link'}],
    }),
    defineField({
      name: 'footer',
      description: 'Additional links in the website Footer',
      type: 'array',
      of: [{name: 'link', type: 'link'}],
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
