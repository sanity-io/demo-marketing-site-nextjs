import {useContext} from 'react'

import {ResizeContext, ResizeContextValue} from './ResizeContext'

export function useResize(): ResizeContextValue {
  const resize = useContext(ResizeContext)

  if (!resize) {
    throw new Error('useResize must be used within a ResizeProvider')
  }

  return resize
}
