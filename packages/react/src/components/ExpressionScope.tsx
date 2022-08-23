import React, { useContext } from 'react'
import { lazyMerge } from '@formily/shared'
import { SchemaExpressionScopeContext } from '../shared'
import { IExpressionScopeProps, ReactFC } from '../types'

export const ExpressionScope: ReactFC<IExpressionScopeProps> = (props) => {
  const scope = useContext(SchemaExpressionScopeContext)
  return (
    <SchemaExpressionScopeContext.Provider
      value={lazyMerge(scope, props.value)}
    >
      {props.children}
    </SchemaExpressionScopeContext.Provider>
  )
}
