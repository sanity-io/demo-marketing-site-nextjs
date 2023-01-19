import {useEffect, useMemo, useState} from 'react'

export function usePrefersReducedMotion(): boolean {
  const mq = useMemo(() => {
    if (typeof window === 'undefined') return undefined

    return window.matchMedia('(prefers-reduced-motion: reduce)')
  }, [])

  const [reducedMotion, setReducedMotion] = useState(mq?.matches || false)

  useEffect(() => {
    if (!mq) return undefined

    setReducedMotion(mq.matches)

    const handleChange = () => setReducedMotion(mq.matches)

    mq.addEventListener('change', handleChange)

    return () => mq.removeEventListener('change', handleChange)
  }, [mq])

  return reducedMotion
}
