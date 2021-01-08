import { inject } from '@vue/composition-api'
import { FormSymbol } from '../shared/context'

export const useForm = (): Formily.Core.Models.Form => {
  const form = inject(FormSymbol, null)
  if (!form) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
