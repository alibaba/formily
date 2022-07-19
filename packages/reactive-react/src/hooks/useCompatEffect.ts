import { useEffect, useRef, EffectCallback, DependencyList } from 'react'
import { immediate } from '../shared'

export const useCompatEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    const dispose = effect()
    return () => {
      mountedRef.current = false
      immediate(() => {
        if (mountedRef.current) return
        if (dispose) dispose()
      })
    }
  }, deps)
}
