import { defineField } from 'sanity'

import { MARKETS } from '../../lib/constants'

export default defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  // TODO: Hide field completely once initial value templates are configured
  hidden: ({ document, value }) => !document._id.startsWith(`drafts.`) && Boolean(value),
  readOnly: true,
  validation: (Rule) => Rule.required(),
})
