import { IFormCreatorOptions } from './types'
import {
  FormValidator,
  setValidationLanguage,
  setValidationLocale
} from '@formily/validator'
import { FormPath, FormPathPattern, BigData } from '@formily/shared'
import { createFormInternals } from './internals'
import { createFormExternals } from './externals'
export * from './shared/lifecycle'
export * from './types'

export const createForm = (options: IFormCreatorOptions = {}) => {
  return createFormExternals(createFormInternals(options))
}

export const registerValidationFormats = FormValidator.registerFormats

export const registerValidationRules = FormValidator.registerRules

export const registerValidationMTEngine = FormValidator.registerMTEngine

export {
  setValidationLanguage,
  setValidationLocale,
  BigData,
  FormPath,
  FormPathPattern
}

export default createForm
