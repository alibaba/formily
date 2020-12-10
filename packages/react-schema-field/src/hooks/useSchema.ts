import { useContext } from 'react'
import { SchemaContext } from '../shared'

export const useSchema = () => {
  return useContext(SchemaContext)
}
