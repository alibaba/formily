export interface ValidatorOptions {
  validateFirst?: boolean
}

export type ValidateNodeMap = {
  [key in string]: (
    options: ValidateFieldOptions
  ) => Promise<{
    errors: string[]
    warnings: string[]
  }>
}

export type ValidateFormatsMap = {
  [key in string]: RegExp
}

export interface ValidateDescription {
  format?: string
  validator?: CustomValidator
  required?: boolean
  pattern?: RegExp | string
  max?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  message?: string
}

export type ValidateRules = ValidateDescription[]

export type ValidateArrayRules = Array<
  string | CustomValidator | ValidateDescription
>

export type ValidatePatternRules =
  | string
  | CustomValidator
  | ValidateDescription
  | ValidateArrayRules

export type CustomValidator = (
  value: any,
  rescription: ValidateDescription
) => ValidateResponse

export type ValidateResponse =
  | null
  | string
  | {
      type?: 'error' | 'warning'
      message: string
    }

export type ValidateRulesMap = {
  [key in string]: (
    value: any,
    description: ValidateDescription
  ) => ValidateResponse
}

export interface ValidateFieldOptions {
  first?: boolean
  key?: string
}

export type ValidateCalculator = (
  validate: (
    value: any,
    rules: ValidatePatternRules
  ) => Promise<ValidateResponse>
) => void
