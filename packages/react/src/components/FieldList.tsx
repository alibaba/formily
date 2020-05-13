import React from 'react'
import { IFieldStateUIProps } from '../types'
import { Field } from './Field'

export const FieldList: React.FC<IFieldStateUIProps> = props => {
  return React.createElement(Field, {
    ...props,
    dataType: 'array'
  })
}

FieldList.displayName = 'ReactInternalFieldList'

FieldList.defaultProps = {
  path: '',
  triggerType: 'onChange'
}
