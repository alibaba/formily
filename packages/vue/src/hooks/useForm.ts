import {
  inject,
  shallowRef,
  watchEffect,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch
} from '@vue/composition-api'
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
import { useForceUpdate } from './useForceUpdate'
const FormHookSymbol = Symbol('FORM_HOOK')

const DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'

let formID = 0

type IInternalFormOptions = IFormCreatorOptions & { form?: IForm }

const useInternalForm = (reactiveOptions: IInternalFormOptions = {}) => {
  const forceUpdate = useForceUpdate()
  const subscribeRef = shallowRef({
    subscribeId: null
  })
  const dirty = useDirty(reactiveOptions, [
    'initialValues',
    'values',
    'editable'
  ])
  const alreadyHaveForm = !!reactiveOptions.form
  const alreadyHaveHookForm =
    reactiveOptions.form && reactiveOptions.form[FormHookSymbol]
  const getForm = () => {
    const form = alreadyHaveForm
      ? reactiveOptions.form
      : createForm(reactiveOptions)
    if (!alreadyHaveForm) {
      subscribeRef.value.subscribeId = form.subscribe(({ type }) => {
        if (type === LifeCycleTypes.ON_FORM_HOST_RENDER) {
          forceUpdate()
        }
      })
    }
    return form
  }
  const form = getForm()

  onMounted(() =>
    watchEffect(() => {
      if (alreadyHaveHookForm) return
      if (dirty.num > 0) {
        form.setFormState(state => {
          if (dirty.dirtys.values && isValid(reactiveOptions.values)) {
            state.values = reactiveOptions.values
          }
          if (
            dirty.dirtys.initialValues &&
            isValid(reactiveOptions.initialValues)
          ) {
            state.initialValues = reactiveOptions.initialValues
          }
          if (dirty.dirtys.editable && isValid(reactiveOptions.editable)) {
            state.editable = reactiveOptions.editable
          }
        })
      }
    })
  )

  onMounted(() => {
    if (alreadyHaveHookForm) return
    form.setFormState(state => {
      state.mounted = true
    })
    formID++
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].inject(formID, form)
    }
  })

  onBeforeUnmount(() => {
    form.unsubscribe(subscribeRef.value.subscribeId)
    form.setFormState(state => {
      state.unmounted = true
    })
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].unmount(formID)
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
  const reactiveProps = reactive(props)
  const actionsRef = shallowRef<any>(props.actions || createFormActions())
  const broadcast = inject<Broadcast>(BroadcastSymbol, null)
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
  const optionsRef = shallowRef<{ [key: string]: any }>({
    ...props,
    initialValues: props.initialValues || props.defaultValue
  })

  watch(
    reactiveProps,
    newProps => {
      Object.assign(optionsRef.value, newProps)
      optionsRef.value.values = newProps.value
      optionsRef.value.lifecycles = lifecycles
    },
    { deep: true, immediate: true }
  )

  const form = useInternalForm(optionsRef.value)
  return form
}

export default useForm
