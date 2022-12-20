import createImageUrlBuilder from '@sanity/image-url'
import {definePreview} from 'next-sanity/preview'

import {config} from '../lib/config'

export const imageBuilder = createImageUrlBuilder({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
})

export const urlForImage = (source) =>
  imageBuilder
    .image({
      /* while uploading images, in preview mode, this field is missing*/
      asset: {_ref: 'image-dummy-1x1-jpg'},
      ...source,
    })
    .auto('format')
    .fit('max')

const {projectId, dataset} = config.sanity
export const usePreview = definePreview({projectId, dataset})
