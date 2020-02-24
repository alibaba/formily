import { useMemo, useEffect, useRef, useContext } from 'react'
import {
  IVirtualFieldStateProps,
  IVirtualFieldState,
  IForm,
  IVirtualField
} from '@formily/core'
import { useForceUpdate } from './useForceUpdate'
import { IVirtualFieldHook } from '../types'
import FormContext from '../context'

export const useVirtualField = (
  options: IVirtualFieldStateProps
): IVirtualFieldHook => {
  const forceUpdate = useForceUpdate()
  //const dirty = useDirty(options, ['props', 'visible', 'display'])
  const ref = useRef<{
    field: IVirtualField
    unmounted: boolean
    subscriberId: number
  }>({
    field: null,
    unmounted: false,
    subscriberId: null
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
    initialized = true
  }, [])

  useEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    ref.current.field.watchProps(
      options,
      ['props', 'visible', 'display'],
      (props: any) => {
        ref.current.field.setState((state: IVirtualFieldState) => {
          Object.assign(state, props)
        })
      }
    )
  })

  useEffect(() => {
    ref.current.field.setState(state => {
      state.mounted = true
    }, !ref.current.field.state.unmounted) //must notify,need to trigger restore value
    ref.current.unmounted = false
    return () => {
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
