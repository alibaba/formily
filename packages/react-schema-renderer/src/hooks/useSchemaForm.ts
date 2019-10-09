import { useMemo, useRef } from 'react'
import { useForm } from '@uform/react'
import { Schema } from '../shared/schema'
import { deprecate } from '@uform/shared'
import { useEva } from 'react-eva'
import { ISchemaFormProps } from '../types'
import { createSchemaFormActions } from '../shared/actions'
import { getRegistry } from '../shared/registry'

const useInternalSchemaForm = (props: ISchemaFormProps) => {
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

export const useSchemaForm = (props: ISchemaFormProps) => {
  const actionsRef = useRef<any>(null)
  actionsRef.current =
    actionsRef.current || props.actions || createSchemaFormActions()
  return useInternalSchemaForm({
    ...props,
    actions: actionsRef.current
  })
}
