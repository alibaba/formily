import { inject, Ref, ref } from 'vue-demi'
import { GeneralField } from '@formily/core'
import { FieldSymbol } from '../shared/context'

export const useField = <T = GeneralField>(): Ref<T> => {
  return inject(FieldSymbol, ref()) as any
}
