import { onBeforeUnmount } from 'vue-demi'
import { Form } from '@formily/core'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (effects?: (form: Form) => void): void => {
  const formRef = useForm()

  const id = uid()
  formRef.value.addEffects(id, effects)

  onBeforeUnmount(() => {
    formRef.value.removeEffects(id)
  })
}
