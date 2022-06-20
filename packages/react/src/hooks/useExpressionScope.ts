import { useContext } from 'react'
import { SchemaExpressionScopeContext } from '../shared/context'

export const useExpressionScope = () => useContext(SchemaExpressionScopeContext)
