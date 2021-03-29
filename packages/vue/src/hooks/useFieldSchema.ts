import { inject } from 'vue-demi'
import { SchemaSymbol } from '../shared/context'

export const useFieldSchema = () => {
  return inject(SchemaSymbol, null)
}
