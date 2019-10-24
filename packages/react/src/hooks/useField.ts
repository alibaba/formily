import { useMemo, useEffect, useRef, useContext } from 'react'
import { each } from '@uform/shared'
import { IFieldStateProps, IFieldState, IForm, IField } from '@uform/core'
import { raf } from '../shared'
import { useDirty } from './useDirty'
import { useForceUpdate } from './useForceUpdate'
import { IFieldHook } from '../types'
import FormContext from '../context'

export const useField = (options: IFieldStateProps): IFieldHook => {
  const forceUpdate = useForceUpdate()
  const dirty = useDirty(options, ['props', 'rules', 'required', 'editable'])
  const ref = useRef<{ field: IField; unmounted: boolean }>({
    field: null,
    unmounted: false
  })
  const form = useContext<IForm>(FormContext)
  if (!form) {
    throw new Error('Form object cannot be found from context.')
  }
  useMemo(() => {
    let initialized = false
    ref.current.field = form.registerField({
      ...options,
      onChange() {
        if (ref.current.unmounted) return
        /**
         * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在uform core内部
         */
        if (initialized) {
          raf(() => {
            forceUpdate()
          })
        }
      }
    })
    initialized = true
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
    ref.current.field.unsafe_setSourceState(state => {
      state.mounted = true
    })
    return () => {
      ref.current.unmounted = true
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
    mutators: form.createMutators(ref.current.field),
    props: state.props
  }
}

export default useField
