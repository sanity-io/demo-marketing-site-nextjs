import {useContext} from 'react'

import {ScrollYContext} from './ScrollYContext'

export function useScrollY(): number {
  return useContext(ScrollYContext)
}
