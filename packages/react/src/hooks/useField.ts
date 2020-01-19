import { useMemo, useEffect, useRef, useContext } from 'react'
import { isFn } from '@uform/shared'
import { IFieldState, IForm, IField, IMutators } from '@uform/core'
import { getValueFromEvent } from '../shared'
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

export const useField = (options: IFieldStateUIProps): IFieldHook => {
  const forceUpdate = useForceUpdate()
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
      if (ref.current.unmounted) return
      /**
       * 同步Field状态只需要forceUpdate一下触发重新渲染，因为字段状态全部代理在uform core内部
       */
      if (initialized) {
        if (options.triggerType === 'onChange' && !fieldState.pristine) {
          if (ref.current.field.hasChanged('value')) {
            mutators.validate({ throwErrors: false })
          }
        }
        forceUpdate()
      }
    })
    initialized = true
    return extendMutators(form.createMutators(ref.current.field), options)
  }, [])

  useEffect(() => {
    //考虑到组件被unmount，props diff信息会被销毁，导致diff异常，所以需要代理在一个持久引用上
    ref.current.field.watchProps(
      options,
      ['props', 'rules', 'required', 'editable', 'visible', 'display'],
      (props: any) => {
        ref.current.field.setState((state: IFieldState) => {
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
