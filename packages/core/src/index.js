import { Form } from './form'
import {
  setLocale as setValidationLocale,
  setLanguage as setValidationLanguage
} from '@uform/validator'
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
}) => {
  let fields = []
  let calculatedValues = caculateSchemaInitialValues(
    schema,
    isEmpty(values) ? initialValues : values,
    ({ name, path, schemaPath }, schema, value) => {
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

  fields = fields.map(({ name, path, schemaPath, schema, value }) => {
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

export { setValidationLocale, setValidationLanguage }

export default createForm
