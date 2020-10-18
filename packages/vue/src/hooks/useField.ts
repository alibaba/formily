import { inject, reactive, watchEffect, computed } from '@vue/composition-api'
import { isFn, merge } from '@formily/shared'
import {
  IFieldState,
  IForm,
  IField,
  IMutators,
  LifeCycleTypes
} from '@formily/core'
import { getValueFromEvent, inspectChanged } from '../shared'
// import { useForceUpdate } from './useForceUpdate'
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
  // const forceUpdate = useForceUpdate()
  const ref = reactive<{
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
  const form = inject<IForm>(FormSymbol)
  if (!form) {
    throw new Error('Form object cannot be found from context.')
  }

  const mutators = computed(() => {
    let initialized = false
    ref.field = form.registerField(options)
    ref.subscriberId = ref.field.subscribe(() => {
      if (ref.unmounted) return
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在formily core内部
       */
      if (initialized) {
        if (options.triggerType === 'onChange') {
          if (ref.field.hasChanged('value')) {
            mutators.value.validate({ throwErrors: false })
          }
        }
        // if (!form.isHostRendering()) {
        //   forceUpdate()
        // }
      }
    })
    ref.uid = Symbol()
    initialized = true
    return extendMutators(form.createMutators(ref.field), options)
  })

  watchEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    const cacheProps = ref.field.getCache(ref.uid)
    if (cacheProps) {
      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS)
      if (props) {
        ref.field.setState((state: IFieldState) => {
          merge(state, props, {
            assign: true,
            arrayMerge: (target, source) => source
          })
        })
      }
      ref.field.setCache(ref.uid, options)
    } else {
      ref.field.setCache(ref.uid, options)
    }
  })

  watchEffect(() => {
    ref.field.setState(state => {
      state.mounted = true
    }, !ref.field.state.unmounted) //must notify,need to trigger restore value
    form.notify(LifeCycleTypes.ON_FIELD_MOUNT, ref.field)
    ref.unmounted = false
    return () => {
      ref.field.removeCache(ref.uid)
      ref.unmounted = true
      ref.field.unsubscribe(ref.subscriberId)
      ref.field.setState((state: IFieldState) => {
        state.unmounted = true
      }) //must notify,need to trigger remove value
    }
  })

  const state = ref.field.getState()

  return {
    form,
    field: ref.field,
    state,
    mutators: mutators.value,
    props: state.props
  }
}

export default useField
