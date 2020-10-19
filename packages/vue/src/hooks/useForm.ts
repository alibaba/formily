import { inject, ref, watchEffect, computed } from '@vue/composition-api'
import {
  createForm,
  IFormCreatorOptions,
  LifeCycleTypes,
  FormLifeCycle,
  IForm
} from '@formily/core'
import { useDirty } from './useDirty'
import { useEva } from '../utils/eva'
import { IFormProps } from '../types'
import { BroadcastSymbol } from '../constants'
import { createFormEffects, createFormActions, Broadcast } from '../shared'
import { isValid, globalThisPolyfill } from '@formily/shared'
// import { useForceUpdate } from './useForceUpdate'
const FormHookSymbol = Symbol('FORM_HOOK')

const DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'

let formID = 0

const useInternalForm = (
  options: IFormCreatorOptions & { form?: IForm } = {}
) => {
  // const forceUpdate = useForceUpdate()
  const subscribeRef = ref({
    subscribeId: null
  })
  const dirty = useDirty(options, ['initialValues', 'values', 'editable'])
  const alreadyHaveForm = !!options.form
  const alreadyHaveHookForm = options.form && options.form[FormHookSymbol]
  const form = computed(() => {
    const form = alreadyHaveForm ? options.form : createForm(options)
    if (!alreadyHaveForm) {
      subscribeRef.value.subscribeId = form.subscribe(({ type }) => {
        if (type === LifeCycleTypes.ON_FORM_HOST_RENDER) {
          // forceUpdate()
        }
      })
    }
    return form
  })

  watchEffect(() => {
    if (alreadyHaveHookForm) return
    if (dirty.num > 0) {
      form.value.setFormState(state => {
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

  watchEffect(() => {
    if (alreadyHaveHookForm) return
    form.value.setFormState(state => {
      state.mounted = true
    })
    formID++
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].inject(formID, form)
    }
    return () => {
      form.value.unsubscribe(subscribeRef.value.subscribeId)
      form.value.setFormState(state => {
        state.unmounted = true
      })
      if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
        globalThisPolyfill[DEV_TOOLS_HOOK].unmount(formID)
      }
    }
  })
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
  const actionsRef = ref<any>(null)
  actionsRef.value = actionsRef.value || props.actions || createFormActions()
  const broadcast = inject<Broadcast>(BroadcastSymbol)
  const { implementActions, dispatch } = useEva({
    actions: actionsRef.value,
    effects: createFormEffects(props.effects, actionsRef.value)
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
  const optionsRef = ref<{ [key: string]: any }>({
    ...props,
    initialValues: props.initialValues || props.defaultValue
  })

  Object.assign(optionsRef.value, props)
  optionsRef.value.values = props.value
  optionsRef.value.lifecycles = lifecycles
  const form = useInternalForm(optionsRef.value)
  return form
}

export default useForm
