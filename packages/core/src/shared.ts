import { FormPath, FormPathPattern, isNum, each } from '@formily/shared'
import { ValidatorTriggerType, validate } from '@formily/validator'
import { runInAction } from 'mobx'
import { Form } from './models/Form'
import { Field } from './models/Field'

export const transformAccessorPath = (pattern: FormPathPattern, form: Form) => {
  const path = FormPath.parse(pattern)
  if (path.isMatchPattern)
    throw new Error('Cannot use matching mode when read or writing values')
  return path.reduce((path: FormPath, key: string, index: number) => {
    if (index >= path.length - 1) return path.concat([key])
    const np = path.slice(0, index + 1)
    const dp = path.concat([key])
    const field = form.fields[np.toString()]
    if (field.void) {
      return path
    }
    return dp
  }, new FormPath(''))
}

export const setFieldValue = (field: Field, value: any) => {
  runInAction(() => {
    field.modified = true
    field.form.modified = true
    field.form.setValuesIn(field.path, value)
  })
}

export const isNumberIndex = (index: any): index is number =>
  isNum(index) || /^\d+$/.test(index)

export const validateField = async (
  field: Field,
  triggerType?: ValidatorTriggerType
) => {
  const results = await validate(field.value, field.validator, {
    triggerType,
    validateFirst: field.form?.props?.validateFirst,
    context: this
  })
  if (field.unmounted) return
  each(results, (messages, type) => {
    field.form.feedback.update({
      triggerType,
      type,
      code: 'ValidateError',
      path: field.path,
      messages
    })
  })
  return results
}
