import { useEffect, useRef, EffectCallback, DependencyList } from 'react'
import { immediate } from '../shared'

const isArr = Array.isArray

const isEqualDeps = (target: any, source: any) => {
  const arrA = isArr(target)
  const arrB = isArr(source)
  if (arrA !== arrB) return false
  if (arrA) {
    if (target.length !== source.length) return false
    return target.every((val, index) => val === source[index])
  }
  return target === source
}

export const useCompatEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const depsRef = useRef<DependencyList>(null)
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    const dispose = effect()
    return () => {
      mountedRef.current = false
      if (!isEqualDeps(depsRef.current, deps)) {
        if (dispose) dispose()
        return
      }
      immediate(() => {
        if (mountedRef.current) return
        if (dispose) dispose()
      })
    }
  }, deps)
  depsRef.current = deps
}
