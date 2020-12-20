import { watch, onBeforeUnmount, ref } from '@vue/composition-api'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void,
  deps = []
): void => {
  const idRef = ref(null)
  const form = useForm()

  const getId = () => {
    if (idRef.value) {
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
    form.removeEffects(idRef.value)
  })
}
