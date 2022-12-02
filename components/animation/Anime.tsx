import anime, { AnimeInstance, AnimeParams } from 'animejs'
import {
  ForwardedRef,
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
} from 'react'

const animationEnabled = !reducedMotion()

export type AnimeProps = {
  params: AnimeParams | AnimeParams[]
  progress?: number /* 0-1*/
  autoplay?: boolean /* default false */
}

export const Anime = forwardRef(function Anime(
  props: AnimeProps & HTMLProps<HTMLDivElement>,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  const { children, params, progress, autoplay = false, ...restProps } = props
  const ref = useRef<HTMLDivElement>()
  const animation = useRef<AnimeInstance>()

  const refUpdate = useCallback(
    (e: HTMLDivElement) => {
      ref.current = e
      if (forwardRef) {
        if (typeof forwardRef === 'function') {
          forwardRef(e)
        } else {
          forwardRef.current = e
        }
      }
    },
    [forwardRef]
  )

  useEffect(() => {
    if (!ref.current || !animationEnabled) {
      return
    }
    const target = ref.current
    if (Array.isArray(params)) {
      animation.current = anime.timeline(
        params.map((p) => ({
          ...p,
          targets: target,
          autoplay,
        }))
      )
    } else {
      animation.current = anime({
        ...params,
        targets: target,
        autoplay,
      })
    }

    return () => {
      animation.current.restart()
      animation.current?.pause()
      ;(animation.current as any)?.remove(target)
    }
  }, [params, autoplay])

  useEffect(() => {
    let instance = animation.current
    if (!instance && progress !== undefined) {
      return
    }
    instance?.seek(instance.duration * progress)
  }, [progress])

  if (!animationEnabled) {
    return <div {...restProps}>{children}</div>
  }

  return (
    <div ref={refUpdate} {...restProps}>
      {children}
    </div>
  )
})

function reducedMotion() {
  const mediaQuery =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)')
  return !mediaQuery || mediaQuery.matches
}
