import { ReactNode, useEffect, useState } from 'react'

import { ViewportContext } from './ViewportContext'

export function ViewportProvider(props: { children?: ReactNode }) {
  const { children } = props

  const [viewport, setViewport] = useState(() => {
    return { width: window.innerWidth, height: window.innerHeight }
  })

  useEffect(() => {
    function handleResize() {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  )
}
