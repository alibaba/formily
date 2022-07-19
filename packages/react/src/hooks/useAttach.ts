import { useRef } from 'react'
import { unstable_useCompatEffect } from '@formily/reactive-react'
interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const oldRef = useRef(null)
  unstable_useCompatEffect(() => {
    if (oldRef.current && oldRef.current !== target) {
      oldRef.current.onUnmount()
    }
    target.onMount()
    oldRef.current = target
    return () => target.onUnmount()
  }, [target])
  return target
}
