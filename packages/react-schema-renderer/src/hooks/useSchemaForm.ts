import { useMemo, useRef } from 'react'
import { useForm, IFormEffect } from '@uform/react'
import { Schema } from '../shared/schema'
import { deprecate, each, lowercase, isFn } from '@uform/shared'
import { useEva } from 'react-eva'
import { ISchemaFormProps } from '../types'
import { createSchemaFormActions } from '../shared/actions'
import { getRegistry } from '../shared/registry'

const lowercaseKeys = (obj: any) => {
  const result = {}
  each(obj, (value, key) => {
    result[lowercase(key)] = value
  })
  return result
}

const combineEffects = ({ effects, linkages, registry,scope }): IFormEffect => {
  return ($, actions) => {
    if(isFn(effects)) effects($, actions)
    linkages.forEach((item: any) => {
      if (item && item.type) {
        if (registry.linkages[item.type]) {
          if (isFn(registry.linkages[item.type](item))) {
            registry.linkages[item.type](item)($, actions)
          }
        }
      }
    })
  }
}

const useInternalSchemaForm = (props: ISchemaFormProps) => {
  const {
    fields,
    virtualFields,
    formComponent,
    formItemComponent,
    schema,
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
  const formSchema = useMemo(() => {
    const result = new Schema(schema)
    implementActions({
      getSchema: deprecate(() => result, 'Please use the getFormSchema.'),
      getFormSchema: () => result
    })
    return result
  }, [schema])
  const registry = getRegistry()
  return {
    form: useForm({
      ...props,
      effects: combineEffects({
        effects,
        linkages: formSchema.linkages,
        registry,
        scope:expressionScope
      })
    }),
    formComponentProps: {
      ...formComponentProps,
      ...formSchema.getExtendsComponentProps()
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
    schema: formSchema,
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
