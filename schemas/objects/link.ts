import { defineType } from "sanity";

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
  
    fields: [
      {
        name: `text`,
        type: `string`,
        validation: (Rule) => Rule.required(),
      },
      {
        name: `reference`,
        type: `reference`,
        description: `If this link has a reference and a URL, the reference will be used`,
        to: [
          {type: 'page'},
        ],
      },
      {
        name: `link`,
        type: `url`,
        validation: (Rule) =>
          Rule.uri({
            scheme: ['https', 'mailto', 'tel'],
          }),
      },
    ],
    preview: {
      select: {
        title: 'text',
        url: 'link',
        ref: 'reference.slug.current',
      },
      prepare(selection) {
        const {title, url, ref} = selection
  
        const subtitle = !url && !ref ? `Empty Link` : ref ?? url
  
        return {
          title: title ?? '',
          subtitle,
        }
      },
    },
  })