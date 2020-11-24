import { useContext } from 'react'
import { FieldContext } from '../shared'

export const useField = () => {
  return useContext(FieldContext)
}
