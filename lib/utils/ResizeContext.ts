import { createContext } from 'react'

export interface ResizeSubscription {
  unsubscribe: () => void
}

export interface ResizeSubscriber {
  (entry: ResizeObserverEntry): void
}

export interface ResizeObservable {
  subscribe: (next: ResizeSubscriber) => ResizeSubscription
}

export interface ResizeContextValue {
  observe: (element: Element) => ResizeObservable
}

export const ResizeContext = createContext<ResizeContextValue>(null)
