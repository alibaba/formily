import { IFormOptions, ISchema } from '@uform/types'
import {
  setLocale as setValidationLocale,
  setLanguage as setValidationLanguage
} from '@uform/validator'

import { Form } from './form'
import { caculateSchemaInitialValues, isFn, each, isEmpty } from './utils'

export * from './path'

export const createForm = ({
  initialValues,
  values,
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
  let calculatedValues = caculateSchemaInitialValues(
    schema,
    isEmpty(values) ? initialValues : values,
    ({ name, path, schemaPath }, schema: ISchema, value: any) => {
      fields.push({ name, path, schemaPath, schema, value })
    }
  )

  if (isEmpty(values)) {
    initialValues = calculatedValues
  } else {
    values = calculatedValues
  }

  const form = new Form({
    initialValues,
    values,
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
    form.dispatchEffect('onFormInit', form.publishState())
    each(
      fields,
      field => {
        form.dispatchEffect('onFieldChange', field.publishState())
      },
      true
    )
  })
  return form
}

export { setValidationLocale, setValidationLanguage, Form }

export default createForm
