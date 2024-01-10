import { unstable_useCompatFactory } from '@formily/reactive-react'
import { Form } from '@formily/core'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (effects?: (form: Form) => void) => {
  const form = useForm()
  unstable_useCompatFactory(() => {
    const id = uid()
    form.addEffects(id, effects)
    return {
      dispose() {
        form.removeEffects(id)
      },
    }
  })
}
