import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const DebugContext = createContext({
  animation: false,
  grid: false,
  label: false,
})

export function useDebug() {
  return useContext(DebugContext)
}

export function DebugProvider(props: { children?: ReactNode }) {
  const { children } = props
  const [animation, setAnimation] = useState(false)
  const [grid, setGrid] = useState(false)
  const [label, setLabel] = useState(false)

  const debug = useMemo(
    () => ({ animation, grid, label }),
    [animation, grid, label]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a') {
        setAnimation((flag) => !flag)
      }

      if (event.key === 'g') {
        setGrid((flag) => !flag)
      }

      if (event.key === 'l') {
        setLabel((flag) => !flag)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <DebugContext.Provider value={debug}>{children}</DebugContext.Provider>
}
