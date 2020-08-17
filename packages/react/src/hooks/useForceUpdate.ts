import { useCallback, useState, useEffect, useRef } from 'react'

// Returning a new object reference guarantees that a before-and-after
//   equivalence check will always be false, resulting in a re-render, even
//   when multiple calls to forceUpdate are batched.

export function useForceUpdate(): () => void {
  const updating = useRef(false)
  const timer = useRef(null)
  const [, dispatch] = useState<{}>(Object.create(null))
  updating.current = true
  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useCallback((): void => {
    if (!updating.current) dispatch(Object.create(null))
    else {
      clearTimeout(timer.current)
      timer.current = setTimeout(()=>{
        dispatch(Object.create(null))
      })
    }
  }, [dispatch])
  useEffect(() => {
    updating.current = false
  })
  return memoizedDispatch
}