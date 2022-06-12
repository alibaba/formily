import { useEffect } from 'react'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  useEffect(() => {
    target.onMount()
    return () => target.onUnmount()
  }, [target])
  return target
}
