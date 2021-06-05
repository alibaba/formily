import { inject, Ref, ref } from 'vue-demi'
import { FormSymbol } from '../shared/context'

export const useForm = (): Ref<Formily.Core.Models.Form> => {
  const form = inject(FormSymbol, ref())
  if (!form) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
