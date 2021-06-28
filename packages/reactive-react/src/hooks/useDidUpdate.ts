import { useLayoutEffect, useRef } from 'react'
import { immediate } from '../shared'

export const useDidUpdate = (callback?: () => void) => {
  const request = useRef(null)
  request.current = immediate(callback)
  useLayoutEffect(() => {
    request.current()
    callback()
  })
}
