import { inject, Ref, ref } from 'vue-demi'
import { Form } from '@formily/core'
import { FormSymbol } from '../shared/context'

export const useForm = (): Ref<Form> => {
  const form = inject(FormSymbol, ref())
  if (!form.value) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
