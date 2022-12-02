import { ArticleStub } from '../../../types'
import { Anime } from '../../animation/Anime'
import { AnimeScroll } from '../../animation/AnimeScroll'
import { enterSoftBottom, float } from '../../animation/scrollAnimations'
import HeroH1 from './hero-h1'
import HeroH1WithImage from './hero-h1-with-image'
import HeroH2 from './hero-h2'
import HeroH2WithImage from './hero-h2-with-image'

export type HeroProps = ArticleStub & {
  index: number
}

export default function PageBuilderHero(props: HeroProps) {
  const { index, image } = props

  if (index === 0) {
    return (
      <div style={{ height: '100vh' }}>
        <div className="sticky top-0">
          {image ? <HeroH1WithImage {...props} /> : <HeroH1 {...props} />}
        </div>
      </div>
    )
  } else {
    return image ? <HeroH2WithImage {...props} /> : <HeroH2 {...props} />
  }
}
