export type ValidatorFormats =
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
  | (string & {})

export type ValidateResult = {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}

export type ValidateResults = {
  error?: string[]
  warning?: string[]
  success?: string[]
}

export const isValidateResult = (obj: any): obj is ValidateResult =>
  !!obj['type'] && !!obj['message']

export type ValidatorFunctionResponse = null | string | boolean | ValidateResult

export type ValidatorFunction<Context = any> = (
  value: any,
  rule: ValidatorRules<Context>,
  ctx: Context
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

export type ValidatorParsedFunction<Context = any> = (
  value: any,
  ctx: Context
) => ValidateResult | Promise<ValidateResult> | null

export type ValidatorTriggerType =
  | 'onInput'
  | 'onFocus'
  | 'onBlur'
  | (string & {})

export type ValidatorRules<Context = any> = {
  triggerType?: ValidatorTriggerType
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
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

export type ValidatorDescription<Context = any> =
  | ValidatorFormats
  | ValidatorFunction<Context>
  | ValidatorRules<Context>

export type MultiValidator<Context = any> = ValidatorDescription<Context>[]

export type Validator<Context = any> =
  | ValidatorDescription<Context>
  | MultiValidator<Context>

export interface IValidatorOptions<Context = any> {
  validateFirst?: boolean
  triggerType?: ValidatorTriggerType
  context?: Context
}
