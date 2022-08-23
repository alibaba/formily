import React from 'react'
import { lazyMerge } from '@formily/shared'
import { ExpressionScope } from './ExpressionScope'
import { ReactFC, IRecordScopeProps } from '../types'
import { useExpressionScope } from '../hooks'

export const RecordScope: ReactFC<IRecordScopeProps> = (props) => {
  const scope = useExpressionScope()
  return (
    <ExpressionScope
      value={{
        get $lookup() {
          return scope?.$record
        },
        get $record() {
          const record = props.getRecord?.()
          if (typeof record === 'object') {
            return lazyMerge(record, {
              get $lookup() {
                return scope?.$record
              },
              get $index() {
                return props.getIndex?.()
              },
            })
          }
          return record
        },
        get $index() {
          return props.getIndex?.()
        },
      }}
    >
      {props.children}
    </ExpressionScope>
  )
}
