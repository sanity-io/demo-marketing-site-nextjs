import * as React from 'react'

import Container from '../../Fix/Container'
import Links from '../../Fix/Links'
import {HeroSubtitle} from '../HeroSubtitle'
import {HeroSummary} from '../HeroSummary'
import {HeroTitle} from '../HeroTitle'
import {HeroProps} from '.'

export default function HeroH1(props: HeroProps) {
  const {title, subtitle, summary, links} = props

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-5 text-center md:py-8">
      {subtitle ? <HeroSubtitle subtitle={subtitle} /> : null}
      {title ? <HeroTitle title={title} /> : null}
      {summary?.length > 0 ? <HeroSummary summary={summary} /> : null}
      {links?.length > 0 ? <Links links={links} /> : null}
    </Container>
  )
}
