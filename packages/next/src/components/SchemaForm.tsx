import React, { useRef } from 'react'
import { SchemaMarkupForm } from '@formily/react-schema-renderer'
import { INextSchemaFormProps } from '../types'
import { autoScrollInValidateFailed } from '../shared'

export const SchemaForm: React.FC<INextSchemaFormProps> = props => {
  const formRef = useRef<HTMLDivElement>()
  return (
    <div ref={formRef}>
      <SchemaMarkupForm
        {...props}
        onValidateFailed={result => {
          if (props.onValidateFailed) {
            props.onValidateFailed(result)
          }
          autoScrollInValidateFailed(formRef)
        }}
      >
        {props.children}
      </SchemaMarkupForm>
    </div>
  )
}
