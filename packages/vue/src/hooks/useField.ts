import {
  inject,
  shallowRef,
  watchEffect,
  watch,
  getCurrentInstance,
  onBeforeUpdate
} from '@vue/composition-api'
import { isFn, merge } from '@formily/shared'
import { IFieldState, IField, IMutators, LifeCycleTypes } from '@formily/core'
import { getValueFromEvent, inspectChanged } from '../shared'
import { useForceUpdate } from './useForceUpdate'
import { IFieldHook, IFieldStateUIProps } from '../types'
import { FormSymbol } from '../constants'

const extendMutators = (
  mutators: IMutators,
  props: IFieldStateUIProps
): IMutators => {
  return {
    ...mutators,
    change: (...args) => {
      args[0] = isFn(props.getValueFromEvent)
        ? props.getValueFromEvent(...args)
        : args[0]
      mutators.change(...args.map(event => getValueFromEvent(event)))
    },
    blur: () => {
      mutators.blur()
      if (props.triggerType === 'onBlur') {
        mutators.validate({ throwErrors: false })
      }
    }
  }
}

const INSPECT_PROPS_KEYS = [
  'props',
  'rules',
  'required',
  'editable',
  'visible',
  'display'
]

export const useField = (options: IFieldStateUIProps): IFieldHook => {
  const forceUpdate = useForceUpdate()
  const fieldRef = shallowRef<{
    field: IField
    unmounted: boolean
    subscriberId: number
    uid: symbol
  }>({
    field: null,
    unmounted: false,
    subscriberId: null,
    uid: null
  })
  const form = inject(FormSymbol, null)
  if (!form) {
    throw new Error('Form object cannot be found from context.')
  }

  const createMutators = () => {
    let initialized = false
    fieldRef.value.field = form.registerField(options)
    fieldRef.value.subscriberId = fieldRef.value.field.subscribe(() => {
      if (fieldRef.value.unmounted) return
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在formily core内部
       */
      if (initialized) {
        if (options.triggerType === 'onChange') {
          if (fieldRef.value.field.hasChanged('value')) {
            mutators.validate({ throwErrors: false })
          }
        }
        if (!form.isHostRendering()) {
          forceUpdate()
        }
      }
    })
    fieldRef.value.uid = Symbol()
    initialized = true
    return extendMutators(form.createMutators(fieldRef.value.field), options)
  }

  let mutators = createMutators()

  watch(
    [() => options.name, () => options.path],
    () => (mutators = createMutators())
  )

  watchEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    const cacheProps = fieldRef.value.field.getCache(fieldRef.value.uid)
    if (cacheProps) {
      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS)
      if (props) {
        fieldRef.value.field.setState((state: IFieldState) => {
          merge(state, props, {
            assign: true,
            arrayMerge: (target, source) => source
          })
        })
      }
      fieldRef.value.field.setCache(fieldRef.value.uid, options)
    } else {
      fieldRef.value.field.setCache(fieldRef.value.uid, options)
    }
  })

  watchEffect(onInvalidate => {
    fieldRef.value.field.setState(state => {
      state.mounted = true
    }, !fieldRef.value.field.state.unmounted) //must notify,need to trigger restore value
    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, fieldRef.value.field)
    fieldRef.value.unmounted = false
    onInvalidate(() => {
      fieldRef.value.field.removeCache(fieldRef.value.uid)
      fieldRef.value.unmounted = true
      fieldRef.value.field.unsubscribe(fieldRef.value.subscriberId)
      fieldRef.value.field.setState((state: IFieldState) => {
        state.unmounted = true
      }) //must notify,need to trigger remove value
    })
  })

  const state = fieldRef.value.field.getState()
  onBeforeUpdate(() => {
    const $vm = getCurrentInstance() as any
    $vm.state = fieldRef.value.field.getState()
  })

  return {
    form,
    field: fieldRef.value.field as IField,
    state,
    mutators,
    props: state.props
  }
}

export default useField
