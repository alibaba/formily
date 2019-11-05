import { useMemo, useEffect, useRef, useContext } from 'react'
import {
  createForm,
  IFormCreatorOptions,
  LifeCycleTypes,
  FormLifeCycle,
  IForm,
  IModel,
  isStateModel,
  IFormState
} from '@uform/core'
import { useDirty } from './useDirty'
import { useEva } from 'react-eva'
import { IFormProps } from '../types'
import { BroadcastContext } from '../context'
import { createFormEffects, createFormActions } from '../shared'
import { isValid } from '@uform/shared'
const FormHookSymbol = Symbol('FORM_HOOK')

const useInternalForm = (
  options: IFormCreatorOptions & { form?: IForm } = {}
) => {
  const dirty = useDirty(options, ['initialValues', 'values', 'editable'])
  const alreadyHaveForm = !!options.form
  const alreadyHaveHookForm = options.form && options.form[FormHookSymbol]
  const form = useMemo(() => {
    return alreadyHaveForm ? options.form : createForm(options)
  }, [])

  useEffect(() => {
    if (alreadyHaveHookForm) return
    if (dirty.num > 0) {
      form.setFormState(state => {
        if (dirty.dirtys.values && isValid(options.values)) {
          state.values = options.values
        }
        if (dirty.dirtys.initialValues && isValid(options.initialValues)) {
          state.values = options.initialValues
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
    return () => {
      form.setFormState(state => {
        state.unmounted = true
      })
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
  const optionsRef = useRef<any>({
    form: props.form,
    values: props.value,
    initialValues: props.initialValues,
    useDirty: props.useDirty,
    editable: props.editable,
    validateFirst: props.validateFirst,
    lifecycles: [
      new FormLifeCycle(
        ({ type, payload }: { type: string; payload: IModel }) => {
          dispatch.lazy(type, () => {
            return isStateModel(payload) ? payload.getState() : payload
          })
          if (type === LifeCycleTypes.ON_FORM_VALUES_CHANGE) {
            if (optionsRef.current.onChange) {
              optionsRef.current.onChange(
                isStateModel(payload)
                  ? payload.getState((state: IFormState) => state.values)
                  : {}
              )
            }
          }
          if (broadcast) {
            broadcast.notify({ type, payload })
          }
        }
      ),
      new FormLifeCycle(
        LifeCycleTypes.ON_FORM_WILL_INIT,
        (payload: IModel, form: IForm) => {
          const actions = {
            ...form,
            dispatch: form.notify
          }
          implementActions(actions)
          if (broadcast) {
            broadcast.setContext(actions)
          }
        }
      )
    ]
  })
  
  const form = useInternalForm(optionsRef.current)
  optionsRef.current.onChange = props.onChange
  optionsRef.current.onReset = props.onReset
  optionsRef.current.onSubmit = props.onSubmit
  optionsRef.current.onValidateFailed = props.onValidateFailed
  return form
}

export default useForm
