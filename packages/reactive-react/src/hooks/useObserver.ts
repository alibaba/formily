import React from 'react'
import { Tracker } from '@formily/reactive'
import { GarbageCollector } from '../shared'
import { IObserverOptions } from '../types'
import { useForceUpdate } from './useForceUpdate'

class AutoCollector {}

export const useObserver = <T extends () => any>(
  view: T,
  options?: IObserverOptions
): ReturnType<T> => {
  const forceUpdate = useForceUpdate()
  const unmountRef = React.useRef(false)
  const gcRef = React.useRef<GarbageCollector>()

  const tracker = React.useMemo(() => {
    return new Tracker(() => {
      if (typeof options?.scheduler === 'function') {
        options.scheduler(forceUpdate)
      } else {
        forceUpdate()
      }
    }, options?.displayName)
  }, [])

  //StrictMode/ConcurrentMode会导致组件无法正确触发Unmount，所以只能自己做垃圾回收
  if (!gcRef.current) {
    gcRef.current = new GarbageCollector(() => {
      if (tracker) {
        tracker.dispose()
      }
    })
    gcRef.current.open(new AutoCollector())
  }

  React.useEffect(() => {
    unmountRef.current = false
    gcRef.current.close()
    return () => {
      unmountRef.current = true
      if (tracker) {
        tracker.dispose()
      }
    }
  }, [])

  return tracker.track(view)
}
