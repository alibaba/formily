import React from 'react'
import { ExpressionScope } from './ExpressionScope'
import { ReactFC, IRecordsScopeProps } from '../types'

export const RecordsScope: ReactFC<IRecordsScopeProps> = (props) => {
  return (
    <ExpressionScope
      value={{
        get $records() {
          return props.getRecords?.() ?? []
        },
      }}
    >
      {props.children}
    </ExpressionScope>
  )
}
