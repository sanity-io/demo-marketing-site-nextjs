import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const DebugContext = createContext({ grid: true })

export function useDebug() {
  return useContext(DebugContext)
}

export function DebugProvider(props: { children?: ReactNode }) {
  const { children } = props
  const [grid, setGrid] = useState(false)

  const debug = useMemo(() => ({ grid }), [grid])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'g') {
        setGrid((grid) => !grid)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <DebugContext.Provider value={debug}>{children}</DebugContext.Provider>
}
