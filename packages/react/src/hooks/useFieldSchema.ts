import { useContext } from 'react'
import { SchemaContext } from '../shared'

export const useFieldSchema = () => {
  return useContext(SchemaContext)
}
