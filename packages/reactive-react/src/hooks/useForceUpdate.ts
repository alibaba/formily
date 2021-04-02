import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const batchUpdate =
  React['batchUpdate'] ||
  ReactDOM['batchUpdate'] ||
  ReactDOM['unstable_batchedUpdates'] ||
  ((callback: any) => callback())

const EMPTY_ARRAY: any[] = []

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const unmountRef = useRef(false)
  const update = useCallback(() => {
    if (unmountRef.current) return
    batchUpdate(() => {
      setTick((tick) => {
        return tick + 1
      })
    })
  }, EMPTY_ARRAY)

  useEffect(() => {
    unmountRef.current = false
    return () => {
      unmountRef.current = true
    }
  }, [])

  return update
}
