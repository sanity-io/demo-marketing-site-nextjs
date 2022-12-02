import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { DEBUG_ANIMATION } from './debug'
import { defaultScrollContext, ScrollContextProvider } from './ScrollContext'

export function ScrollContainer(props: PropsWithChildren<{}>) {
  const containerRef = useRef<HTMLDivElement>()
  const [scrollContext, setScrollContext] = useState(defaultScrollContext)

  useEffect(() => {
    //const element = containerRef.current

    function update(e: HTMLDivElement | HTMLBodyElement) {
      if (!element) {
        return
      }

      const rect = e.getBoundingClientRect()
      setScrollContext({
        y: rect.y,
        height: window.innerHeight,
        scrollY: window.scrollY,
      })
    }

    const body = document.querySelector('body')
    const scrollListener = (e: Event) => {
      update(body)
    }

    const element = document.querySelector('html')

    document.addEventListener('scroll', scrollListener, {
      passive: true,
    })
    update(body)
    return () => document?.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <>
      {DEBUG_ANIMATION && (
        <div className="z-100 fixed top-1 right-1 flex flex-col gap-1 bg-black p-2">
          <div>ScrollY: {Math.floor(scrollContext.scrollY)}</div>
          <div>Height: {Math.floor(scrollContext.height)}</div>
        </div>
      )}
      <div ref={containerRef}>
        <ScrollContextProvider value={scrollContext}>
          {props.children}
        </ScrollContextProvider>
      </div>
    </>
  )
}
