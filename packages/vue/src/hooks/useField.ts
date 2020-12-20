import { inject } from '@vue/composition-api'
import { FieldSymbol } from '../shared'

export const useField = <T = Formily.Core.Types.GeneralField>(): T => {
  return inject(FieldSymbol, null) as any
}
