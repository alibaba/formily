export type FormState = {
  values: any //表单数据
  valid: boolean //是否合法
  invalid: boolean //是否不合法
  errors: string[] //错误提示集合
  pristine: boolean //是否是原始态
  dirty: boolean //是否存在变化
}