import { useRef, useEffect } from 'react'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const oldTargetRef = useRef<IRecycleTarget>(null)
  const targetRef = useRef<IRecycleTarget>(null)
  targetRef.current = target
  useEffect(() => {
    targetRef.current.onMount()
    oldTargetRef.current = targetRef.current
    return () => {
      targetRef.current.onUnmount()
    }
  }, [])
  useEffect(() => {
    if (oldTargetRef.current && targetRef.current !== oldTargetRef.current) {
      oldTargetRef.current.onUnmount()
    }
  }, [targetRef.current])
  return target
}
