import { useMemo, useRef, createElement } from 'react'
import { useForm } from '@formily/react'
import { Schema } from '../shared/schema'
import { deprecate, each, map, lowercase, isFn } from '@formily/shared'
import { useEva } from 'react-eva'
import { ISchemaFormProps } from '../types'
import { createSchemaFormActions } from '../shared/actions'
import { getRegistry } from '../shared/registry'
import { connect } from '../shared/connect'
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

const ConnectedComponent = Symbol.for('connected')

const transformComponents = (components: any) => {
  const virtualFields = {}
  const fields = {}
  each(components, (component, key) => {
    if (!isFn(component) && !component['styledComponentId'])
      return () => {
        return createElement('div', {}, 'Can not found any component.')
      }
    let FinalComponent: any    
    if ((component as any).isVirtualFieldComponent) {
      virtualFields[key] = component
    } else {
      if (
        component['__ALREADY_CONNECTED__'] ||
        (component as any).isFieldComponent
      ) {
        FinalComponent = component
      } else if (!component[ConnectedComponent]) {
        component[ConnectedComponent] = connect()(component as any)
        FinalComponent = component[ConnectedComponent]
      } else {
        FinalComponent = component[ConnectedComponent]
      }

      fields[key] = FinalComponent
    }    
  })

  return {
    virtualFields,
    fields,
  }
}

const useInternalSchemaForm = (props: ISchemaFormProps) => {
  const {
    fields,
    virtualFields,
    components,
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
  const {
    fields: transformFields,
    virtualFields: transformVirtualFields
  } = transformComponents(components)

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
      ...fields,
      ...transformFields,
    }),
    virtualFields: lowercaseKeys({
      ...registry.virtualFields,
      ...virtualFields,
      ...transformVirtualFields,
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
