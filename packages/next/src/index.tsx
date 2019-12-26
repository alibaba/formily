import React, { useRef } from 'react'
import {
  SchemaMarkupForm,
  SchemaMarkupField
} from '@uform/react-schema-renderer'
import { INextSchemaFormProps, INextSchemaFieldProps } from './types'
import './fields'
export * from './compat'
export * from '@uform/react-schema-renderer'
export * from './components'
export * from './types'
export { mapStyledProps, mapTextComponent } from './shared'
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
          if (formRef.current) {
            setTimeout(() => {
              const elements = formRef.current.querySelectorAll(
                '.next-form-item.has-error'
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
export const Field: React.FC<INextSchemaFieldProps> = SchemaMarkupField
export default SchemaForm
