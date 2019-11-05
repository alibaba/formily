import { useMemo, useEffect, useRef, useContext } from 'react'
import { each } from '@uform/shared'
import { IFieldStateProps, IFieldState, IForm, IField } from '@uform/core'
import { raf } from '../shared'
import { useDirty } from './useDirty'
import { useForceUpdate } from './useForceUpdate'
import { IFieldHook } from '../types'
import FormContext from '../context'

export const useField = (
  options: IFieldStateProps & { triggerType?: 'onChange' | 'onBlur' }
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
    ref.current.subscriberId = ref.current.field.subscribe(() => {
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在uform core内部
       */
      if (initialized) {
        if (options.triggerType === 'onChange') {
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
    return form.createMutators(ref.current.field)
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
