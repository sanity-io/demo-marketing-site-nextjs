import { createContext } from 'react'

export interface ViewportContextValue {
  width: number
  height: number
}

export const ViewportContext = createContext<ViewportContextValue>(null)
