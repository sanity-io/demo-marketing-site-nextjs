import { defineType } from 'sanity'

import IconSelector from '../../sanity/components/IconSelector'

export default defineType({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  components: {input: IconSelector},
})
