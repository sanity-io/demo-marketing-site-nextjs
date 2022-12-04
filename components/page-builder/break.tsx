import anime, { AnimeInstance } from 'animejs'
import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '../../lib/utils/usePrefersReducedMotion'
import Container from '../container'

const circles = [...Array(30).keys()]

export default function InfoBreak() {
  const animationEnabled = !usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!animationEnabled || !ref.current) {
      return
    }

    const targets = ref.current.querySelectorAll('div')

    const instance = anime({
      targets,
      autoplay: true,
      loop: true,
      direction: 'alternate',
      duration: 2000,
      delay: anime.stagger(100),
      easing: 'spring',
      translateY: [0, 5, -5, 0],
      opacity: [1, 0.3, 0.7, 0.3],
      scaleX: [1, 0.5],
      scaleY: [1, 0.5],
      rotate: [0, 180, 270, 720, 0, 360],
    })
    return () => {
      instance.restart()
      instance?.pause()
      ;(instance as any)?.remove(targets)
    }
  }, [animationEnabled])

  return (
    <Container className="relative">
      <div
        ref={ref}
        className="flex w-full items-center justify-center gap-4 py-12"
      >
        {circles.map((i) => (
          <div key={i} className="radius-50 h-3 w-3 border border-gray-800" />
        ))}
      </div>
    </Container>
  )
}
