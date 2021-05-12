import { FormPath } from '@formily/shared'
import { Form } from '../models'
import { IFormProps } from '../types'
import {
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEnigne,
  registerValidateRules,
} from '@formily/validator'
import {
  createEffectHook,
  createEffectContext,
  useEffectForm,
} from './effectbox'
import {
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
} from './checkers'

const createForm = <T extends Record<any, any> = any>(
  options?: IFormProps<T>
) => {
  return new Form(options)
}

export {
  FormPath,
  createForm,
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
  setValidateLanguage,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEnigne,
  registerValidateRules,
  createEffectHook,
  createEffectContext,
  useEffectForm,
}
