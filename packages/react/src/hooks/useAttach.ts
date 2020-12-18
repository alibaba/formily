import { useRef, useEffect } from 'react'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const ref = useRef<IRecycleTarget>(null)
  const targetRef = useRef<IRecycleTarget>(null)
  targetRef.current = target
  useEffect(() => {
    if(ref.current && targetRef.current !== ref.current){
      ref.current.onUnmount()
    }
    targetRef.current.onMount()
    ref.current = targetRef.current
    return () => {
      targetRef.current.onUnmount()
    }
  }, [])
  return target
}
