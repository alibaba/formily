import { inject, Ref } from 'vue-demi'
import { FormSymbol } from '../shared/context'

export const useForm = (): Ref<Formily.Core.Models.Form> => {
  const form = inject(FormSymbol, null)
  if (!form) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
