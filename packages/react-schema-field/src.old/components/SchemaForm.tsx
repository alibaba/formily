import React from 'react'
import { ISchemaFormProps } from '../types'
import { Form } from '@formily/react'
import { SchemaField } from './SchemaField'
import { useSchemaForm } from '../hooks/useSchemaForm'
import {
  FormSchemaContext,
  FormComponentsContext,
  FormExpressionScopeContext
} from '../shared/context'
import { log } from '@formily/shared'

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
      <FormExpressionScopeContext.Provider value={props.expressionScope}>
        <FormSchemaContext.Provider value={schema}>
          <Form form={form}>
            {React.createElement(
              formComponent,
              {
                ...formComponentProps,
                onSubmit: (e: any) => {
                  if (e && e.preventDefault) e.preventDefault()
                  if (e && e.stopPropagation) e.stopPropagation()
                  form.submit().catch(e => log.warn(e))
                },
                onReset: () => {
                  form.reset({ validate: false, forceClear: false })
                }
              },
              <SchemaField schema={schema} path={''} />,
              children
            )}
          </Form>
        </FormSchemaContext.Provider>
      </FormExpressionScopeContext.Provider>
    </FormComponentsContext.Provider>
  )
}

SchemaForm.defaultProps = {
  schema: {}
}

export default SchemaForm
