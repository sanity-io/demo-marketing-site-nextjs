import { createContext, useContext } from 'react'

export interface ScrollContextValue {
  y: number
  height: number
  scrollY: number
}

export const defaultScrollContext: ScrollContextValue = {
  y: 0,
  height: 0,
  scrollY: 0,
}

const ScrollContext = createContext(defaultScrollContext)
export const ScrollContextProvider = ScrollContext.Provider

export function useScrollContext(): ScrollContextValue {
  return useContext(ScrollContext)
}
