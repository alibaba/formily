import { useMemo, useEffect, useRef, useContext } from 'react'
import { each, isFn } from '@uform/shared'
import {
  IFieldState,
  IForm,
  IField,
  IMutators
} from '@uform/core'
import { raf, getValueFromEvent } from '../shared'
import { useDirty } from './useDirty'
import { useForceUpdate } from './useForceUpdate'
import { IFieldHook, IFieldStateUIProps } from '../types'
import FormContext from '../context'

const extendMutators = (mutators: IMutators, props: IFieldStateUIProps): IMutators => {
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
        mutators.validate()
      }
    }
  }
}

export const useField = (
  options: IFieldStateUIProps
): IFieldHook => {
  const forceUpdate = useForceUpdate()
  const dirty = useDirty(options, ['props', 'rules', 'required', 'editable'])
  const ref = useRef<{
    field: IField
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
  const mutators = useMemo(() => {
    let initialized = false
    ref.current.field = form.registerField(options)
    ref.current.subscriberId = ref.current.field.subscribe(fieldState => {
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在uform core内部
       */
      if (initialized) {
        if (options.triggerType === 'onChange' && !fieldState.pristine) {
          if (ref.current.field.hasChanged('value')) {
            mutators.validate()
          }
        }
        raf(() => {
          if (ref.current.unmounted) return
          forceUpdate()
        })
      }
    })
    initialized = true
    return extendMutators(form.createMutators(ref.current.field), options)
  }, [])

  useEffect(() => {
    if (dirty.num > 0) {
      ref.current.field.setState((state: IFieldState) => {
        each(dirty.dirtys, (result, key) => {
          if (result) {
            state[key] = options[key]
          }
        })
      })
    }
  })

  useEffect(() => {
    ref.current.field.setState(state => {
      state.mounted = true
    }, true)
    ref.current.unmounted = false
    return () => {
      ref.current.unmounted = true
      ref.current.field.unsubscribe(ref.current.subscriberId)
      ref.current.field.setState((state: IFieldState) => {
        state.unmounted = true
      })
    }
  }, [])

  const state = ref.current.field.getState()
  return {
    form,
    state: {
      ...state,
      errors: state.errors.join(', ')
    },
    mutators,
    props: state.props
  }
}

export default useField
