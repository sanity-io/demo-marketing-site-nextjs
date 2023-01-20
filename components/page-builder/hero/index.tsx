import * as React from 'react'

import {ArticleStub} from '../../../types'
import HeroH1 from './hero-h1'
import HeroH1WithImage from './hero-h1-with-image'

export type HeroProps = ArticleStub

export default function PageBuilderHero(props: HeroProps) {
  const {image} = props

  return image ? <HeroH1WithImage {...props} /> : <HeroH1 {...props} />
}
