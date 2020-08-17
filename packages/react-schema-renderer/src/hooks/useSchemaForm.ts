import { useMemo, useRef, createElement } from 'react'
import { useForm } from '@formily/react'
import { Schema } from '../shared/schema'
import { deprecate, each, lowercase, isFn } from '@formily/shared'
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
  const fieldComponents = {}
  const virtualFieldComponents = {}
  each(components, (component: any, name) => {
    if (!isFn(component) && !component['styledComponentId'])
      fieldComponents[name] = () => {
        return createElement('div', {}, 'Can not found any component.')
      }
    if (component['__ALREADY_CONNECTED__'] || component['isFieldComponent']) {
      fieldComponents[name] = component
    } else if (component['__VIRTUAL_BOX__']) {
      virtualFieldComponents[component['__VIRTUAL_BOX__']['key']] =
        component['__VIRTUAL_BOX__']['component']
    } else if (component['isVirtualFieldComponent']) {
      virtualFieldComponents[name] = component
    } else if (!component[ConnectedComponent]) {
      component[ConnectedComponent] = connect()(component)
      fieldComponents[name] = component[ConnectedComponent]
    } else {
      fieldComponents[name] = component[ConnectedComponent]
    }
  })

  return { fieldComponents, virtualFieldComponents }
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
  const { fieldComponents, virtualFieldComponents } = transformComponents(
    components
  )
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
      ...fieldComponents
    }),
    virtualFields: lowercaseKeys({
      ...registry.virtualFields,
      ...virtualFields,
      ...virtualFieldComponents
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
