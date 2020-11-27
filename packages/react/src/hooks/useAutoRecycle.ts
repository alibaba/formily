import { useRef, useEffect } from 'react'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAutoRecycle = <T extends IRecycleTarget>(
  target: T,
  disable?: boolean
): T => {
  const ref = useRef<IRecycleTarget>(null)
  useEffect(() => {
    if (!target || disable) return
    if (ref.current && ref.current !== target) {
      //当组件与实例绑定关系发生变化时，需要自动回收上次绑定的实例，防止内存泄漏
      ref.current.onUnmount()
      ref.current = target
    }
    target.onMount()
    return () => {
      target.onUnmount()
    }
  }, [target])
  return target
}
