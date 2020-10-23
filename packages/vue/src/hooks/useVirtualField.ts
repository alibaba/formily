import {
  inject,
  shallowRef,
  watchEffect,
  computed,
  getCurrentInstance,
  onBeforeUpdate
} from '@vue/composition-api'
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
import { FormSymbol } from '../constants'

const INSPECT_PROPS_KEYS = ['props', 'visible', 'display']

export const useVirtualField = (
  options: IVirtualFieldRegistryProps
): IVirtualFieldHook => {
  const forceUpdate = useForceUpdate()
  //const dirty = useDirty(options, ['props', 'visible', 'display'])
  const fieldRef = shallowRef<{
    field: IVirtualField
    unmounted: boolean
    subscriberId: number
    uid: symbol
  }>({
    field: null,
    unmounted: false,
    subscriberId: null,
    uid: null
  })
  const form = inject<IForm>(FormSymbol)
  if (!form) {
    throw new Error('Form object cannot be found from context.')
  }
  computed(() => {
    let initialized = false
    fieldRef.value.field = form.registerVirtualField(options)
    fieldRef.value.subscriberId = fieldRef.value.field.subscribe(() => {
      if (fieldRef.value.unmounted) return
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在formily core内部
       */
      if (initialized) {
        forceUpdate()
      }
    })
    fieldRef.value.uid = Symbol()
    initialized = true
  })

  watchEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    const cacheProps = fieldRef.value.field.getCache(fieldRef.value.uid)
    if (cacheProps) {
      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS)
      if (props) {
        fieldRef.value.field.setState((state: IVirtualFieldState) => {
          merge(state, props, {
            assign: true,
            arrayMerge: (target, source) => source
          })
        })
        fieldRef.value.field.setCache(fieldRef.value.uid, options)
      }
    } else {
      fieldRef.value.field.setCache(fieldRef.value.uid, options)
    }
  })

  watchEffect(() => {
    fieldRef.value.field.setState(state => {
      state.mounted = true
    }, !fieldRef.value.field.state.unmounted) //must notify,need to trigger restore value
    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, fieldRef.value.field)
    fieldRef.value.unmounted = false
    return () => {
      fieldRef.value.field.removeCache(fieldRef.value.uid)
      fieldRef.value.unmounted = true
      fieldRef.value.field.unsubscribe(fieldRef.value.subscriberId)
      fieldRef.value.field.setState((state: IVirtualFieldState) => {
        state.unmounted = true
      }) //must notify,need to trigger remove value
    }
  })

  const state = fieldRef.value.field.getState()
  onBeforeUpdate(() => {
    const $vm = getCurrentInstance() as any
    $vm.state = fieldRef.value.field.getState()
  })

  return {
    state,
    field: fieldRef.value.field as IVirtualField,
    form,
    props: state.props
  }
}

export default useVirtualField
