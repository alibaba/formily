import React, { useMemo, Fragment } from 'react'
import { ISchemaFormProps } from '../types'
import { useForm, Form } from '@uform/react'
import { Schema } from '../shared/schema'
import SchemaContext, { FormItemContext } from '../context'

export const SchemaForm: React.FC<ISchemaFormProps> = function(
  props: ISchemaFormProps
) {
  const {
    components,
    component,
    schema,
    value,
    initialValues,
    actions,
    effects,
    onChange,
    onSubmit,
    onReset,
    onValidateFailed,
    useDirty,
    children,
    editable,
    validateFirst,
    ...innerProps
  } = props
  const newSchema = useMemo(() => {
    return new Schema(schema)
  }, [schema])
  const newForm = useForm(props)
  return (
    <FormItemContext.Provider
      value={components && components.formItem ? components.formItem : Fragment}
    >
      <SchemaContext.Provider value={newSchema}>
        <Form {...props} form={newForm}>
          {React.createElement(
            components && components.form ? components.form : component,
            {
              ...innerProps,
              onSubmit: () => {
                form.submit()
              },
              onReset: () => {
                form.reset()
              }
            },
            children
          )}
        </Form>
      </SchemaContext.Provider>
    </FormItemContext.Provider>
  )
}

SchemaForm.defaultProps = {
  schema: {},
  component: 'form'
}

export default SchemaForm
