import * as React from 'react'
import { setLocale, setLanguage } from '@uform/validator'
import { FormPath } from '@uform/core'
import { IFormActions, IAsyncFormActions } from '@uform/types'
import { createActions, createAsyncActions } from 'react-eva'

import {
  OriginForm,
  registerFieldMiddleware,
  registerFormFieldPropsTransformer,
  registerFormField,
  registerFormFields,
  registerFormWrapper
} from './shared/core'
import { FormField } from './state/field'
import { calculateSchemaInitialValues } from './utils'
import { SchemaField, SchemaMarkup } from './decorators/markup'
import initialize from './initialize'
import { ISchemaFormProps } from './type'

export * from './type'
export * from './shared/virtualbox'
export * from './decorators/connect'
export * from './shared/broadcast'
export * from './shared/array'

initialize()

export const SchemaForm = SchemaMarkup()(
  React.forwardRef((props: ISchemaFormProps, ref: React.Ref<any>) => {
    // 这个时候就有 schema 数据
    const { children, className, ...others } = props
    return (
      <OriginForm
        className={`rs-uform ${className || ''}`}
        {...others}
        ref={ref}
      >
        <div className="rs-uform-content">
          <FormField name="" path={[]} schemaPath={[]} />
        </div>
        {children}
      </OriginForm>
    )
  })
)

export const Field = SchemaField

export const setValidationLocale = setLocale

export const setValidationLanguage = setLanguage

export const createFormActions = (): IFormActions =>
  createActions(
    'getFormState',
    'getFieldState',
    'setFormState',
    'setFieldState',
    'getSchema',
    'reset',
    'submit',
    'validate',
    'dispatch'
  )

export const createAsyncFormActions = (): IAsyncFormActions =>
  createAsyncActions(
    'getFormState',
    'getFieldState',
    'setFormState',
    'setFieldState',
    'getSchema',
    'reset',
    'submit',
    'validate',
    'dispatch'
  )

export {
  registerFormField,
  registerFormFields,
  registerFormWrapper,
  registerFieldMiddleware,
  registerFormFieldPropsTransformer,
  calculateSchemaInitialValues,
  FormPath
}

SchemaForm.displayName = 'SchemaForm'

export default SchemaForm
