import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'
import { Block, KeyedObject } from 'sanity'

import { Link } from '../../../types'
import Button from '../../button'
import Container from '../../container'
import HeroH1 from './hero-h1'
import HeroH1WithImage from './hero-h1-with-image'
import HeroH2 from './hero-h2'
import HeroH2WithImage from './hero-h2-with-image'

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

  if (index === 0) {
    return image ? <HeroH1WithImage {...props} /> : <HeroH1 {...props} />
  } else {
    return image ? <HeroH2WithImage {...props} /> : <HeroH2 {...props} />
  }
}
