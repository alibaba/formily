import { isFn } from '@formily/shared'
import { useRef, useEffect } from 'react'

interface IAttachTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = (target: IAttachTarget, condition?: () => boolean) => {
  const ref = useRef<IAttachTarget>(null)
  useEffect(() => {
    if (isFn(condition)) {
      if (condition() === false) return
    }
    if (!target) return
    if (ref.current && ref.current !== target) {
      ref.current.onUnmount()
      ref.current = target
    }
    target.onMount()
    return () => {
      target.onUnmount()
    }
  }, [target])
}
