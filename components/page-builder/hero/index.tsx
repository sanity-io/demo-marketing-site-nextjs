import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'
import { Block, KeyedObject } from 'sanity'

import { Link } from '../../../types'
import Button from '../../button'
import Container from '../../container'
import HeroH1 from './hero-h1'
import HeroH1WithImage from './hero-h1-with-image'

export type HeroProps = KeyedObject & {
  _type: 'hero'
  index: number
  title?: string
  subtitle?: string
  links: (KeyedObject & Link)[]
  image?: SanityImageSource
  content?: Block[]
}

export default function PageBuilderHero(props: HeroProps) {
  const { index, image } = props

  if (index === 0 && !image) {
    return <HeroH1 {...props} />
  } else if (index === 0) {
    return <HeroH1WithImage {...props} />
  }

  // TODO: Adapt layout:
  // 1. If this is the first item in the index, render a <h1>
  // 1.1 If it has an image, align left with image right
  // 1.2 If it has no image, align center
  // 2. If this is not the first item in the index, render a <h2>
  // 2.1 If it has an image, align left with image right
  // 2.2 If it has no image, align center

  return null
}
