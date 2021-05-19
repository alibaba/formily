import { GeneralField } from '@formily/core/esm/types'
import { useContext } from 'react'
import { FieldContext } from '../shared'

export const useField = <T extends GeneralField = GeneralField>(): T => {
  return useContext(FieldContext) as any
}
