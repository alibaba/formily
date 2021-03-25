import { inject, Ref } from 'vue-demi'
import { FieldSymbol } from '../shared/context'

export const useField = <T = Formily.Core.Types.GeneralField>(): Ref<T> => {
  return inject(FieldSymbol, null) as any
}
