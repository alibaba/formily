import { useMemo, useEffect, useRef, useContext } from 'react'
import {
  createForm,
  IFormCreatorOptions,
  LifeCycleTypes,
  FormLifeCycle,
  IForm
} from '@formily/core'
import { useDirty } from './useDirty'
import { useEva } from 'react-eva'
import { IFormProps } from '../types'
import { BroadcastContext } from '../context'
import { createFormEffects, createFormActions } from '../shared'
import { isValid, globalThisPolyfill } from '@formily/shared'
import { useForceUpdate } from './useForceUpdate'
const FormHookSymbol = Symbol('FORM_HOOK')

const DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'

let formID = 0

const useInternalForm = (
  options: IFormCreatorOptions & { form?: IForm } = {}
) => {
  const forceUpdate = useForceUpdate()
  const ref = useRef({
    subscribeId: null
  })
  const dirty = useDirty(options, ['initialValues', 'values', 'editable'])
  const alreadyHaveForm = !!options.form
  const alreadyHaveHookForm = options.form && options.form[FormHookSymbol]
  const form = useMemo(() => {
    const form = alreadyHaveForm ? options.form : createForm(options)
    if (!alreadyHaveForm) {
      ref.current.subscribeId = form.subscribe(({ type }) => {
        if (type === LifeCycleTypes.ON_FORM_HOST_RENDER) {
          forceUpdate()
        }
      })
    }
    return form
  }, [])

  useEffect(() => {
    if (alreadyHaveHookForm) return
    if (dirty.num > 0) {
      form.setFormState(state => {
        if (dirty.dirtys.values && isValid(options.values)) {
          state.values = options.values
        }
        if (dirty.dirtys.initialValues && isValid(options.initialValues)) {
          state.initialValues = options.initialValues
        }
        if (dirty.dirtys.editable && isValid(options.editable)) {
          state.editable = options.editable
        }
      })
    }
  })

  useEffect(() => {
    if (alreadyHaveHookForm) return
    form.setFormState(state => {
      state.mounted = true
    })
    formID++
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].inject(formID, form)
    }
    return () => {
      form.unsubscribe(ref.current.subscribeId)
      form.setFormState(state => {
        state.unmounted = true
      })
      if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
        globalThisPolyfill[DEV_TOOLS_HOOK].unmount(formID)
      }
    }
  }, [])
  ;(form as any)[FormHookSymbol] = true
  return form
}

export const useForm = <
  Value = any,
  DefaultValue = any,
  EffectPayload = any,
  EffectAction = any
>(
  props: IFormProps<Value, DefaultValue, EffectPayload, EffectAction>
) => {
  const actionsRef = useRef<any>(null)
  actionsRef.current =
    actionsRef.current || props.actions || createFormActions()
  const broadcast = useContext(BroadcastContext)
  const { implementActions, dispatch } = useEva({
    actions: actionsRef.current,
    effects: createFormEffects(props.effects, actionsRef.current)
  })
  const lifecycles = [
    new FormLifeCycle(({ type, payload }) => {
      dispatch.lazy(type, () => {
        return payload?.getState ? payload.getState?.() : payload
      })
      if (broadcast) {
        broadcast.notify({ type, payload })
      }
    }),
    new FormLifeCycle(
      LifeCycleTypes.ON_FORM_WILL_INIT,
      (form: IForm, formApi) => {
        const actions = {
          ...formApi,
          dispatch: formApi.notify
        }
        implementActions(actions)
        if (broadcast) {
          broadcast.setContext(actions)
        }
      }
    )
  ]
  const optionsRef = useRef<any>({
    ...props,
    initialValues: props.initialValues || props.defaultValue
  })

  Object.assign(optionsRef.current, props)
  optionsRef.current.values = props.value
  optionsRef.current.lifecycles = lifecycles
  const form = useInternalForm(optionsRef.current)
  return form
}

export default useForm
