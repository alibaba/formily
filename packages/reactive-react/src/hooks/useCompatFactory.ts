import React from 'react'
import { GarbageCollector } from '../shared'
import { useCompatEffect } from './useCompatEffect'

class ObjectToBeRetainedByReact {}

function objectToBeRetainedByReactFactory() {
  return new ObjectToBeRetainedByReact()
}

export const useCompatFactory = <T extends { dispose: () => void }>(
  factory: () => T
): T => {
  const instRef = React.useRef<T>(null)
  const gcRef = React.useRef<GarbageCollector>()
  const [objectRetainedByReact] = React.useState(
    objectToBeRetainedByReactFactory
  )
  if (!instRef.current) {
    instRef.current = factory()
  }
  //StrictMode/ConcurrentMode会导致组件无法正确触发UnMount，所以只能自己做垃圾回收
  if (!gcRef.current) {
    gcRef.current = new GarbageCollector(() => {
      if (instRef.current) {
        instRef.current.dispose()
      }
    })
    gcRef.current.open(objectRetainedByReact)
  }

  useCompatEffect(() => {
    gcRef.current.close()
    return () => {
      if (instRef.current) {
        instRef.current.dispose()
        instRef.current = null
      }
    }
  }, [])
  return instRef.current
}
