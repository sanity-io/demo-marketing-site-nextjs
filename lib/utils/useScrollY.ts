import { useContext } from 'react'

import { ScrollYContext } from './ScrollYContext'

export function useScrollY() {
  return useContext(ScrollYContext)
}
