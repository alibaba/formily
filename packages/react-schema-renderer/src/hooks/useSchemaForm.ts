import { useMemo } from 'react'
import { useForm } from '@uform/react'
import { Schema } from '../shared/schema'
import { deprecate } from '@uform/shared'
import { useEva } from 'react-eva'
import { ISchemaFormProps } from '../types'
import { getRegistry } from '../shared/registry'

export const useSchemaForm = (props: ISchemaFormProps) => {
  const {
    fields,
    virtualFields,
    formComponent,
    formItemComponent,
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
    ...formComponentProps
  } = props
  const { implementActions } = useEva({
    actions
  })
  const registry = getRegistry()
  return {
    form: useForm(props),
    formComponentProps,
    fields: {
      ...registry.fields,
      ...fields
    },
    virtualFields: {
      ...registry.virtualFields,
      ...virtualFields
    },
    formComponent: formComponent ? formComponent : registry.formComponent,
    formItemComponent: formItemComponent
      ? formItemComponent
      : registry.formItemComponent,
    schema: useMemo(() => {
      const result = new Schema(schema)
      implementActions({
        getSchema: deprecate(() => result, 'Please use the getFormSchema.'),
        getFormSchema: () => result
      })
      return result
    }, [schema]),
    children
  }
}
