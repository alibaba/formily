import { watch, onBeforeUnmount, ref } from 'vue-demi'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void,
  deps = []
): void => {
  const idRef = ref<string | null>(null)
  const form = useForm()

  const getId = () => {
    if (idRef.value !== null) {
      form.removeEffects(idRef.value)
    }
    const id = uid()
    form.addEffects(id, effects)
    return id
  }

  watch(
    deps,
    () => {
      idRef.value = getId()
    },
    {
      immediate: true
    }
  )

  onBeforeUnmount(() => {
    if (idRef.value !== null) {
      form.removeEffects(idRef.value)
    }
  })
}
