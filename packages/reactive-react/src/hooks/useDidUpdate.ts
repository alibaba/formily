import { useRef } from 'react'
import { useLayoutEffect } from './useLayoutEffect'
import { immediate } from '../shared'

export const useDidUpdate = (callback?: () => void) => {
  const request = useRef(null)
  request.current = immediate(callback)
  useLayoutEffect(() => {
    request.current()
    callback()
  })
}
