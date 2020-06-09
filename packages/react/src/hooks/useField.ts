import { useMemo, useEffect, useRef, useContext } from 'react'
import { isFn, merge } from '@formily/shared'
import {
  IFieldState,
  IForm,
  IField,
  IMutators,
  LifeCycleTypes
} from '@formily/core'
import { getValueFromEvent, inspectChanged } from '../shared'
import { useForceUpdate } from './useForceUpdate'
import { IFieldHook, IFieldStateUIProps } from '../types'
import FormContext from '../context'

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
  const ref = useRef<{
    field: IField
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

  const mutators = useMemo(() => {
    let initialized = false
    ref.current.field = form.registerField(options)
    ref.current.subscriberId = ref.current.field.subscribe(
      (fieldState: IFieldState) => {
        if (ref.current.unmounted) return
        /**
         * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在formily core内部
         */
        if (initialized) {
          if (options.triggerType === 'onChange') {
            if (ref.current.field.hasChanged('value')) {
              mutators.validate({ throwErrors: false })
            }
          }
          if (!form.isHostRendering()) {
            forceUpdate()
          }
        }
      }
    )
    ref.current.uid = Symbol()
    initialized = true
    return extendMutators(form.createMutators(ref.current.field), options)
  }, [options.name, options.path])

  useEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    const cacheProps = ref.current.field.getCache(ref.current.uid)
    if (cacheProps) {
      const props = inspectChanged(cacheProps, options, INSPECT_PROPS_KEYS)
      if (props) {
        ref.current.field.setState((state: IFieldState) => {
          merge(state, props, {
            assign: true,
            arrayMerge: (target, source) => source
          })
        })
      }
      ref.current.field.setCache(ref.current.uid, options)
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
      ref.current.field.setState((state: IFieldState) => {
        state.unmounted = true
      }) //must notify,need to trigger remove value
    }
  }, [])

  const state = ref.current.field.getState()

  return {
    form,
    field: ref.current.field,
    state,
    mutators,
    props: state.props
  }
}

export default useField
