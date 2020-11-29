import { useContext } from 'react'
import { ArrayFieldContext } from '../shared'

export const useArrayField = () => {
  return useContext(ArrayFieldContext)
}
