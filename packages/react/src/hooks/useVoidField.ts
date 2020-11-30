import { useContext } from 'react'
import { VoidFieldContext } from '../shared'

export const useVoidField = () => {
  return useContext(VoidFieldContext)
}
