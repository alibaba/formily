import React from 'react'
import {
  SchemaMarkupForm,
  SchemaMarkupField,
  InternalField,
  InternalVirtualField,
  InternalFieldList,
  InternalForm,
  SchemaField,
  Schema,
  FormPath,
  JSONCondition,
  compileObject,
  FormEffectHooks,
  createEffectHook,
  setValidationLanguage,
  setValidationLocale,
  registerValidationFormats,
  registerValidationRules,
  registerValidationMTEngine,
  useField,
  useFieldState,
  useForm,
  useFormEffects,
  useFormSpy,
  useFormState,
  useVirtualField,
  createFormActions,
  createAsyncFormActions,
  connect,
  registerFieldMiddleware,
  registerFormComponent,
  registerFormField,
  registerFormFields,
  registerFormItemComponent,
  registerVirtualBox,
  parseLinkages,
  useValueLinkageEffect
} from '@formily/react-schema-renderer'
import { INextSchemaFormProps, INextSchemaFieldProps } from './types'
import './fields'
import './compat'
export const SchemaForm: React.FC<INextSchemaFormProps> = SchemaMarkupForm as any
export const Field: React.FC<INextSchemaFieldProps> = SchemaMarkupField
import {
  mapStyledProps,
  mapTextComponent,
  normalizeCol,
  mapSelectComponent
} from './shared'

export * from './adaptor'
export * from './components'
export * from './types'

export default SchemaForm

export {
  SchemaMarkupField,
  InternalField,
  InternalVirtualField,
  InternalFieldList,
  InternalForm,
  FormPath,
  SchemaField,
  mapSelectComponent,
  Schema,
  JSONCondition,
  FormEffectHooks,
  compileObject,
  createEffectHook,
  setValidationLanguage,
  setValidationLocale,
  registerValidationFormats,
  registerValidationRules,
  registerValidationMTEngine,
  useField,
  useFieldState,
  useForm,
  useFormEffects,
  useFormSpy,
  useFormState,
  useVirtualField,
  mapStyledProps,
  mapTextComponent,
  createFormActions,
  createAsyncFormActions,
  connect,
  registerFieldMiddleware,
  registerFormComponent,
  registerFormField,
  registerFormFields,
  registerFormItemComponent,
  registerVirtualBox,
  parseLinkages,
  useValueLinkageEffect,
  normalizeCol,
  SchemaMarkupForm
}
