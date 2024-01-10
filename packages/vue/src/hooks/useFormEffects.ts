import { onBeforeUnmount, watchEffect } from 'vue-demi'
import { Form } from '@formily/core'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (effects?: (form: Form) => void): void => {
  const formRef = useForm()

  const stop = watchEffect((onCleanup) => {
    const id = uid()
    formRef.value.addEffects(id, effects)

    onCleanup(() => {
      formRef.value.removeEffects(id)
    })
  })

  onBeforeUnmount(() => stop())
}
