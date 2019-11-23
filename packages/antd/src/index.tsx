import React, { useRef } from 'react'
import {
  SchemaMarkupForm,
  SchemaMarkupField
} from '@uform/react-schema-renderer'
import { IAntdSchemaFormProps, IAntdSchemaFieldProps } from './types'
import './fields'
import './compat'
export * from '@uform/react-schema-renderer'
export * from './components'
export * from './types'
export { mapStyledProps, mapTextComponent } from './shared'
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
          if (formRef.current) {
            setTimeout(() => {
              const elements = formRef.current.querySelectorAll(
                '.ant-form-item-control.has-error'
              )
              if (elements && elements.length) {
                if (!elements[0].scrollIntoView) return
                elements[0].scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'center'
                })
              }
            }, 30)
          }
        }}
      >
        {props.children}
      </SchemaMarkupForm>
    </div>
  )
}
export const Field: React.FC<IAntdSchemaFieldProps> = SchemaMarkupField
export default SchemaForm
