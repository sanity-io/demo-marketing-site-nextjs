import { createContext, useContext } from 'react'

export interface ScrollProgress {
  in: number
  out: number
}

const ScrollProgressContext = createContext<ScrollProgress>({ in: 0, out: 0 })
export const ScrollProgressProvider = ScrollProgressContext.Provider

export function useScrollProgress(): ScrollProgress {
  return useContext(ScrollProgressContext)
}
