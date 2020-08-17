import { useState, useRef, useEffect } from 'react'

export function useForceUpdate(): () => void {
  const updating = useRef(true)
  const [, setState] = useState(Object.create(null))
  useEffect(() => {
    updating.current = false
  })
  updating.current = true
  return () => {
    if (updating.current) return
    setState(Object.create(null))
  }
}
