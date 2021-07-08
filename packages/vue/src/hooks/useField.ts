import { inject, Ref, ref } from 'vue-demi'
import { FieldSymbol } from '../shared/context'

export const useField = <T = Formily.Core.Types.GeneralField>(): Ref<T> => {
  return inject(FieldSymbol, ref()) as any
}
