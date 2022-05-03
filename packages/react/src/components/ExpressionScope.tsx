import React, { useContext } from 'react'
import { SchemaExpressionScopeContext } from '../shared'
import { IExpressionScopeProps, ReactFC } from '../types'

export const ExpressionScope: ReactFC<IExpressionScopeProps> = (props) => {
  const scope = useContext(SchemaExpressionScopeContext)
  return (
    <SchemaExpressionScopeContext.Provider value={{ ...scope, ...props.value }}>
      {props.children}
    </SchemaExpressionScopeContext.Provider>
  )
}
