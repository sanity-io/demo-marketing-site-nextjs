import { ReactNode, useEffect, useState } from 'react'

import { ScrollYContext } from './ScrollYContext'

export function ScrollYProvider(props: { children?: ReactNode }) {
  const { children } = props
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setScrollTop(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollYContext.Provider value={scrollTop}>
      {children}
    </ScrollYContext.Provider>
  )
}
