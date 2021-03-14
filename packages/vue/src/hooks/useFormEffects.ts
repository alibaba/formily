import { onBeforeUnmount } from 'vue-demi'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void
): void => {
  const form = useForm()

  const id = uid()
  form.addEffects(id, effects)

  onBeforeUnmount(() => {
    form.removeEffects(id)
  })
}
