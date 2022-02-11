import React, { useContext } from 'react'
import { SchemaExpressionScopeContext } from '../shared'
import { IExpressionScopeProps } from '../types'

export const ExpressionScope: React.FC<IExpressionScopeProps> = (props) => {
  const scope = useContext(SchemaExpressionScopeContext)
  return (
    <SchemaExpressionScopeContext.Provider value={{ ...scope, ...props.value }}>
      {props.children}
    </SchemaExpressionScopeContext.Provider>
  )
}
