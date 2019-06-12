import * as React from 'react'
import { setLocale, setLanguage } from '@uform/validator'
import { FormPath } from '@uform/core'
import { IFormActions } from '@uform/types'
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
import { caculateSchemaInitialValues } from './utils'
import { SchemaField, SchemaMarkup } from './decorators/markup'
import initialize from './initialize'
import { SchemaFormProps } from './type'

export * from './shared/virtualbox'
export * from './decorators/connect'
export * from './shared/broadcast'
export * from './shared/array'

initialize()

export const SchemaForm = SchemaMarkup()(
  React.forwardRef((props: SchemaFormProps, ref: React.Ref<any>) => {
    const { children, className, ...others } = props
    return (
      <OriginForm className={`rs-uform ${className || ''}`} {...others} ref={ref}>
        <div className='rs-uform-content'>
          <FormField name='' path={[]} schemaPath={[]} />
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

export const createAsyncFormActions = (): IFormActions =>
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
  caculateSchemaInitialValues,
  FormPath
}

SchemaForm.displayName = 'SchemaForm'

export default SchemaForm
