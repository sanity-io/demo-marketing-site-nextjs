import * as React from 'react'

import {ArticleStub} from '../../../types'
import HeroH1 from './hero-h1'
import HeroH1WithImage from './hero-h1-with-image'
import HeroH2 from './hero-h2'
import HeroH2WithImage from './hero-h2-with-image'

export type HeroProps = ArticleStub & {
  index: number
}

export default function PageBuilderHero(props: HeroProps) {
  const {index, image} = props

  if (index === 0) {
    return image ? <HeroH1WithImage {...props} /> : <HeroH1 {...props} />
  }
  return image ? <HeroH2WithImage {...props} /> : <HeroH2 {...props} />
}
