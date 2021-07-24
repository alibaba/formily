import type { IValidatorRules, ValidatorFormats } from '@formily/validator'

export type Validator = IValidatorRules | ValidatorFormats

export interface IValidatorInfo {
  selectedValidator: Validator
  selectedValidatorChangeHandler(v): void
}
