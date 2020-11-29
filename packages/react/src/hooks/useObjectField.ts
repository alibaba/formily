import { useContext } from 'react'
import { ObjectFieldContext } from '../shared'

export const useObjectField = () => {
  return useContext(ObjectFieldContext)
}
