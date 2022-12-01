import { createContext, useContext } from 'react'

const ScrollProgressContext = createContext(0)
export const ScrollProgressProvider = ScrollProgressContext.Provider

export function useScrollProgress(): number {
  return useContext(ScrollProgressContext)
}
