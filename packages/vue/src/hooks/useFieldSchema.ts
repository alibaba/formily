import { inject } from 'vue-demi'
import { SchemaSymbol } from '../shared/context'

export const useFieldSchema = <T = Formily.Core.Types.GeneralField>(): T => {
  return inject(SchemaSymbol, null) as any
}
