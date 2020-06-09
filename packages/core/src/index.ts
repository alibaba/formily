import { IFormCreatorOptions } from './types'
import {
  FormValidator,
  setValidationLanguage,
  setValidationLocale
} from '@formily/validator'
import { FormPath, FormPathPattern, BigData } from '@formily/shared'
import { createFormInternals } from './internals'
import { createFormExternals } from './externals'
import { FormGraph } from './shared/graph'
import { createModel } from './shared/model'
export * from './shared/lifecycle'
export * from './types'

declare global {
  namespace FormilyCore {
    export interface FieldProps {
      [key: string]: any
    }
    export interface VirtualFieldProps {
      [key: string]: any
    }
  }
}

export const createForm = (options: IFormCreatorOptions = {}) => {
  return createFormExternals(createFormInternals(options))
}

export const registerValidationFormats = FormValidator.registerFormats

export const registerValidationRules = FormValidator.registerRules

export const registerValidationMTEngine = FormValidator.registerMTEngine

export {
  setValidationLanguage,
  setValidationLocale,
  createModel,
  BigData,
  FormGraph,
  FormPath,
  FormPathPattern
}

export default createForm
