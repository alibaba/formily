import { inject, Ref } from 'vue-demi'
import { FieldSymbol } from '../shared/context'

export const useField = (): Ref<Formily.Core.Types.GeneralField> => {
  return inject(FieldSymbol, null)
}
