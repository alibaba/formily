import React, { useRef } from 'react'
import { SchemaMarkupForm } from '@formily/react-schema-renderer'
import { IAntdSchemaFormProps } from '../types'
import { autoScrollInValidateFailed } from '../shared'

export const SchemaForm: React.FC<IAntdSchemaFormProps> = props => {
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
