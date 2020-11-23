import { useContext } from 'react'
import { FieldContext } from '../context'

export const useField = () => {
  return useContext(FieldContext)
}
