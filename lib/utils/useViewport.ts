import {useContext} from 'react'

import {ViewportContext, ViewportContextValue} from './ViewportContext'

export function useViewport(): ViewportContextValue {
  const viewport = useContext(ViewportContext)

  if (!viewport) {
    throw new Error('useViewport must be used within a ViewportProvider')
  }

  return viewport
}
