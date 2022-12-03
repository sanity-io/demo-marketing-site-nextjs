import anime, { AnimeInstance, AnimeParams } from 'animejs'
import {
  ForwardedRef,
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { usePrefersReducedMotion } from '../../lib/utils/usePrefersReducedMotion'

export interface AnimeProps {
  params: AnimeParams | AnimeParams[]
  /** 0-1 */
  progress?: number
  /** default `false` */
  autoplay?: boolean
}

export const Anime = forwardRef(function Anime(
  props: AnimeProps & HTMLProps<HTMLDivElement>,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  const { children, params, progress, autoplay = false, ...restProps } = props
  const ref = useRef<HTMLDivElement>()
  const animation = useRef<AnimeInstance>()
  const animationEnabled = !usePrefersReducedMotion()

  const setReference = useCallback(
    (element: HTMLDivElement) => {
      ref.current = element

      if (typeof forwardRef === 'function') {
        forwardRef(element)
      } else if (forwardRef) {
        forwardRef.current = element
      }
    },
    [forwardRef]
  )

  // Set up animation
  useEffect(() => {
    if (!ref.current) return
    if (!animationEnabled) return

    // Animation targets this element
    const targets = ref.current

    if (Array.isArray(params)) {
      // Create new timeline instance
      animation.current = anime.timeline(
        params.map((p) => ({ ...p, targets, autoplay }))
      )
    } else {
      // Create new animation instance
      animation.current = anime({ ...params, targets, autoplay })
    }

    return () => {
      animation.current.restart()
      animation.current?.pause()
      ;(animation.current as any)?.remove(targets)
    }
  }, [animationEnabled, autoplay, params])

  // Update progress
  useEffect(() => {
    let instance = animation.current

    if (!instance) return
    if (progress === undefined) return

    instance.seek(instance.duration * progress)
  }, [progress])

  return (
    <div ref={setReference} {...restProps}>
      {children}
    </div>
  )
})
