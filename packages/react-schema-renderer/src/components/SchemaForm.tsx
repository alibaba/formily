import React from 'react'
import { ISchemaFormProps } from '../types'
import { Form } from '@formily/react'
import { SchemaField } from './SchemaField'
import { useSchemaForm } from '../hooks/useSchemaForm'
import SchemaContext, { FormComponentsContext } from '../shared/context'

export const SchemaForm: React.FC<ISchemaFormProps> = props => {
  const {
    fields,
    virtualFields,
    formComponent,
    formItemComponent,
    formComponentProps,
    schema,
    form,
    children
  } = useSchemaForm(props)
  return (
    <FormComponentsContext.Provider
      value={{ fields, virtualFields, formComponent, formItemComponent }}
    >
      <SchemaContext.Provider value={schema}>
        <Form form={form}>
          {React.createElement(
            formComponent,
            {
              ...formComponentProps,
              onSubmit: e => {
                if (e && e.preventDefault) e.preventDefault()
                form.submit().catch(e => console.warn(e))
              },
              onReset: () => {
                form.reset({ validate: false, forceClear: false })
              }
            },
            <SchemaField schema={schema} path={''} />,
            children
          )}
        </Form>
      </SchemaContext.Provider>
    </FormComponentsContext.Provider>
  )
}

SchemaForm.defaultProps = {
  schema: {}
}

export default SchemaForm
