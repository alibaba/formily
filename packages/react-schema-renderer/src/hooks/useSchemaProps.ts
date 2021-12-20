import { useContext } from 'react'
import { SchemaFieldPropsContext } from '../shared/context'

export const useSchemaProps = () => useContext(SchemaFieldPropsContext)
