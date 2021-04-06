import { useLayoutEffect, useRef } from 'react'

export const useDidUpdate = (callback?: () => void) => {
  const timer = useRef(null)
  timer.current = setTimeout(callback)
  useLayoutEffect(() => {
    clearTimeout(timer.current)
    callback()
  })
}
