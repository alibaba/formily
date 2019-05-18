export type RuleDescription = {
  required?: boolean
  message?: string,
  pattern?: RegExp | string,
  validator?: Validator
}

export type Validator = (value: any, rule: RuleDescription, values: object, name: string) => string | null

export type DefaultPatternRule = 'url' | 'email' | 'ipv6' | 'ipv4' | 'number' | 'integer' | 'qq' | 'phone' | 'idcard' | 'taodomain' | 'money' | 'zh' | 'date' | 'zip'
