import { IFormOptions } from '@uform/types'
import {
  setLocale as setValidationLocale,
  setLanguage as setValidationLanguage
} from '@uform/validator'

import { Form } from './form'
import { caculateSchemaInitialValues, isFn, each } from './utils'

export * from './path'

export const createForm = ({
  initialValues,
  onSubmit,
  onReset,
  schema,
  onFormChange,
  onFieldChange,
  onFormWillInit,
  subscribes,
  editable,
  effects,
  onValidateFailed
}: IFormOptions) => {
  let fields = []
  initialValues = caculateSchemaInitialValues(
    schema,
    initialValues,
    ({ name, path, schemaPath }, schema, value: any) => {
      fields.push({ name, path, schemaPath, schema, value })
    }
  )
  const form = new Form({
    initialValues,
    onSubmit,
    onReset,
    subscribes,
    onFormChange,
    onFieldChange,
    editable,
    effects,
    onValidateFailed,
    schema
  })

  if (isFn(onFormWillInit)) {
    onFormWillInit(form)
  }

  fields = fields.map(({ name, schemaPath, schema }) => {
    return form.registerField(name || schemaPath.join('.'), {
      path: schemaPath,
      props: schema
    })
  })

  form.syncUpdate(() => {
    form.triggerEffect('onFormInit', form.publishState())
    each(
      fields,
      field => {
        form.triggerEffect('onFieldChange', field.publishState())
      },
      true
    )
  })
  return form
}

export { setValidationLocale, setValidationLanguage, Form }

export default createForm
