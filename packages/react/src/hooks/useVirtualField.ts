import { useMemo, useEffect, useRef, useContext } from 'react'
import {
  IVirtualFieldRegistryProps,
  IVirtualFieldState,
  IForm,
  IVirtualField,
  LifeCycleTypes
} from '@formily/core'
import { merge } from '@formily/shared'
import { useForceUpdate } from './useForceUpdate'
import { IVirtualFieldHook } from '../types'
import { inspectChanged } from '../shared'
import FormContext from '../context'

const INSPECT_PROPS_KEYS = ['props', 'visible', 'display']

export const useVirtualField = (
  options: IVirtualFieldRegistryProps
): IVirtualFieldHook => {
  const forceUpdate = useForceUpdate()
  //const dirty = useDirty(options, ['props', 'visible', 'display'])
  const ref = useRef<{
    field: IVirtualField
    unmounted: boolean
    subscriberId: number
    uid: Symbol
  }>({
    field: null,
    unmounted: false,
    subscriberId: null,
    uid: null
  })
  const form = useContext<IForm>(FormContext)
  if (!form) {
    throw new Error('Form object cannot be found from context.')
  }
  useMemo(() => {
    let initialized = false
    ref.current.field = form.registerVirtualField(options)
    ref.current.subscriberId = ref.current.field.subscribe(() => {
      if (ref.current.unmounted) return
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在formily core内部
       */
      if (initialized) {
        forceUpdate()
      }
    })
    ref.current.uid = Symbol()
    initialized = true
  }, [options.name,options.path])

  useEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    const cacheProps = ref.current.field.getCache(ref.current.uid)
    if (cacheProps) {
      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS)
      if (props) {
        ref.current.field.setState((state: IVirtualFieldState) => {
          merge(state, props, {
            assign: true,
            arrayMerge: (target, source) => source
          })
        })
        ref.current.field.setCache(ref.current.uid, options)
      }
    } else {
      ref.current.field.setCache(ref.current.uid, options)
    }
  })

  useEffect(() => {
    ref.current.field.setState(state => {
      state.mounted = true
    }, !ref.current.field.state.unmounted) //must notify,need to trigger restore value
    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, ref.current.field)
    ref.current.unmounted = false
    return () => {
      ref.current.field.removeCache(ref.current.uid)
      ref.current.unmounted = true
      ref.current.field.unsubscribe(ref.current.subscriberId)
      ref.current.field.setState((state: IVirtualFieldState) => {
        state.unmounted = true
      }) //must notify,need to trigger remove value
    }
  }, [])

  const state = ref.current.field.getState()

  return {
    state,
    field: ref.current.field,
    form,
    props: state.props
  }
}

export default useVirtualField
