export interface ValidatorOptions {
  validateFirst?: boolean
}

export type ValidateNode = (
  options: ValidateFieldOptions
) => Promise<{
  errors: string[]
  warnings: string[]
}>

export type ValidateNodeMap = {
  [key in string]: ValidateNode
}

export type ValidateFormatsMap = {
  [key in string]: RegExp
}

export type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string

export interface ValidateDescription {
  format?: InternalFormats
  validator?: CustomValidator
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  message?: string
  [key: string]: any
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
  rescription?: ValidateDescription
) => ValidateResponse

export type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }

export type ValidateResponse = SyncValidateResponse | AsyncValidateResponse

export type AsyncValidateResponse = Promise<SyncValidateResponse>

export type ValidateRulesMap = {
  [key in string]: (
    value: any,
    description: ValidateDescription
  ) => ValidateResponse | Promise<ValidateResponse>
}

export interface ValidateFieldOptions {
  first?: boolean
}

export type ValidateCalculator = (
  validate: (
    value: any,
    rules: ValidatePatternRules
  ) => Promise<{
    errors: string[]
    warnings: string[]
  }>
) => void

export interface ValidateNodeResult {
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
}
