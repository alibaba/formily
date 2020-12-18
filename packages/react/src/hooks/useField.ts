import { useContext } from 'react'
import { FieldContext } from '../shared'

export const useField = <T = Formily.Core.Types.GeneralField>(): T => {
  return useContext(FieldContext) as any
}
