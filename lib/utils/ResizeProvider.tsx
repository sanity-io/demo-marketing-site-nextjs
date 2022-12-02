import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'

import {
  ResizeContext,
  ResizeObservable,
  ResizeSubscriber,
} from './ResizeContext'

export function ResizeProvider(props: { children?: ReactNode }) {
  const { children } = props

  const ro = useRef<ResizeObserver>()
  const elements = useRef<Element[]>([])
  const subscriberMap = useRef<WeakMap<Element, ResizeSubscriber>>(
    new WeakMap()
  )

  useEffect(() => {
    ro.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target

        const next = subscriberMap.current.get(element)

        next(entry)
      }
    })

    return () => {
      ro.current.disconnect()
    }
  }, [])

  const observe = useCallback((element: HTMLElement): ResizeObservable => {
    return {
      subscribe(next) {
        elements.current.push(element)
        ro.current.observe(element)

        subscriberMap.current.set(element, next)

        return {
          unsubscribe() {
            ro.current.unobserve(element)

            const idx = elements.current.indexOf(element)

            if (idx > -1) {
              elements.current.splice(idx, 1)
            }
          },
        }
      },
    }
  }, [])

  const resize = useMemo(() => ({ observe }), [observe])

  return (
    <ResizeContext.Provider value={resize}>{children}</ResizeContext.Provider>
  )
}
