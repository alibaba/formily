import { useMemo, useRef } from 'react'
import { useForm } from '@uform/react'
import { Schema } from '../shared/schema'
import { deprecate, each, lowercase, isFn } from '@uform/shared'
import { useEva } from 'react-eva'
import { ISchemaFormProps } from '../types'
import { createSchemaFormActions } from '../shared/actions'
import { getRegistry } from '../shared/registry'
import { useValueVisibleLinkageEffect } from '../linkages/visible'
import { useValueSchemaLinkageEffect } from '../linkages/schema'
import { useValueStateLinkageEffect } from '../linkages/state'

const lowercaseKeys = (obj: any) => {
  const result = {}
  each(obj, (value, key) => {
    result[lowercase(key)] = value
  })
  return result
}

const useInternalSchemaForm = (props: ISchemaFormProps) => {
  const {
    fields,
    virtualFields,
    formComponent,
    formItemComponent,
    schema: propsSchema,
    defaultValue,
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
    expressionScope,
    form,
    editable,
    validateFirst,
    ...formComponentProps
  } = props
  const { implementActions } = useEva({
    actions
  })
  const schema = useMemo(() => {
    const result = new Schema(propsSchema)
    implementActions({
      getSchema: deprecate(() => result, 'Please use the getFormSchema.'),
      getFormSchema: () => result
    })
    return result
  }, [propsSchema])
  const registry = getRegistry()
  return {
    form: useForm({
      ...props,
      effects: ($, actions) => {
        useValueVisibleLinkageEffect(expressionScope)
        useValueSchemaLinkageEffect(expressionScope)
        useValueStateLinkageEffect(expressionScope)
        if (isFn(effects)) {
          effects($, actions)
        }
      }
    }),
    formComponentProps: {
      ...formComponentProps,
      ...schema.getExtendsComponentProps()
    },
    fields: lowercaseKeys({
      ...registry.fields,
      ...fields
    }),
    virtualFields: lowercaseKeys({
      ...registry.virtualFields,
      ...virtualFields
    }),
    formComponent: formComponent ? formComponent : registry.formComponent,
    formItemComponent: formItemComponent
      ? formItemComponent
      : registry.formItemComponent,
    schema,
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
