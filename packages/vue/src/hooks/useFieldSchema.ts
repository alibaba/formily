import { inject, ref } from 'vue-demi'
import { SchemaSymbol } from '../shared/context'

export const useFieldSchema = () => {
  return inject(SchemaSymbol, ref())
}
