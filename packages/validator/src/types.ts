export type ValidatorFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'number'
  | 'integer'
  | 'idcard'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | (string & {})

export interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}

export interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}

export const isValidateResult = (obj: any): obj is IValidateResult =>
  !!obj['type'] && !!obj['message']

export type ValidatorFunctionResponse =
  | null
  | string
  | boolean
  | IValidateResult

export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

export type ValidatorParsedFunction<Context = any> = (
  value: any,
  ctx: Context
) => IValidateResult | Promise<IValidateResult> | null

export type ValidatorTriggerType =
  | 'onInput'
  | 'onFocus'
  | 'onBlur'
  | (string & {})

export interface IValidatorRules<Context = any> {
  triggerType?: ValidatorTriggerType
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  maxItems?: number
  minItems?: number
  maxLength?: number
  minLength?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  const?: any
  multipleOf?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  message?: string
  [key: string]: any
}

export interface IRegistryLocaleMessages {
  [key: string]: string | IRegistryLocaleMessages
}

export interface IRegistryLocales {
  [language: string]: IRegistryLocaleMessages
}

export interface IRegistryRules<Context = any> {
  [key: string]: ValidatorFunction<Context>
}

export interface IRegistryFormats {
  [key: string]: string | RegExp
}

export type ValidatorDescription<Context = any> =
  | ValidatorFormats
  | ValidatorFunction<Context>
  | IValidatorRules<Context>

export type MultiValidator<Context = any> = ValidatorDescription<Context>[]

export type Validator<Context = any> =
  | ValidatorDescription<Context>
  | MultiValidator<Context>

export interface IValidatorOptions<Context = any> {
  validateFirst?: boolean
  triggerType?: ValidatorTriggerType
  context?: Context
}
