import { onBeforeUnmount } from 'vue-demi'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void
): void => {
  const formRef = useForm()

  const id = uid()
  formRef.value.addEffects(id, effects)

  onBeforeUnmount(() => {
    formRef.value.removeEffects(id)
  })
}
