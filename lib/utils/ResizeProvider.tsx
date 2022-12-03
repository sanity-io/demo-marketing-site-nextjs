import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'

import {
  ResizeContext,
  ResizeObservable,
  ResizeSubscriber,
} from './ResizeContext'

// TODO: rename to `ElementRectObserverProvider`?
export function ResizeProvider(props: {
  children?: ReactNode
  rootElement?: HTMLElement | null
}) {
  const { children, rootElement = null } = props

  const mo = useRef<MutationObserver>()
  const ro = useRef<ResizeObserver>()
  const elements = useRef<Element[]>([])
  const subscriberMap = useRef<WeakMap<Element, ResizeSubscriber>>(
    new WeakMap()
  )

  // Set up the mutation observer
  useEffect(() => {
    if (!rootElement) return

    mo.current = new MutationObserver(() => {
      console.log('mutate')

      for (const element of elements.current) {
        const subscriber = subscriberMap.current.get(element)
        if (subscriber) subscriber()
      }
    })

    mo.current.observe(rootElement, {
      // NOTE: `attributes` is required for `style` changes but will trigger on every animation frame.
      // attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    })

    return () => {
      ro.current.disconnect()
      ro.current = undefined
    }
  }, [rootElement])

  // Set up the resize observer
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
      ro.current = undefined
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
