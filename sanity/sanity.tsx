import createImageUrlBuilder from '@sanity/image-url'
import {definePreview} from 'next-sanity/preview'

import {sanityConfig} from './config'

const {projectId, dataset} = sanityConfig

export const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source) =>
  imageBuilder
    .image({
      /* while uploading images, in preview mode, this field is missing*/
      asset: {_ref: 'image-dummy-1x1-jpg'},
      ...source,
    })
    .auto('format')
    .fit('max')

export const usePreview = definePreview({projectId, dataset})
