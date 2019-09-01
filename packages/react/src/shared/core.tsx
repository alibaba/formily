import * as React from 'react'
import pascalCase from 'pascal-case'

import { ISchemaFormProps, IFieldProps } from '../type'
import { isFn, isNotEmptyStr, lowercase, each, compose } from '../utils'

// 最原生的 Form，用到了 DOM 的 form 标签
export interface INativeFormProps {
  component: string
  formRef?: React.Ref<any>
}

export interface IRegisteredFieldsMap {
  [name: string]: ComponentWithStyleComponent<any>
}

export type ComponentWithStyleComponent<ComponentProps> = React.ComponentType<
  ComponentProps
> & {
  styledComponentId?: string
}

let FIELD_WRAPPERS
let FORM_FIELDS
let FIELD_PROPS_TRANSFORMERS
let FIELD_RENDERER
let FORM_COMPONENT

export const initialContainer = () => {
  FIELD_WRAPPERS = []
  FORM_FIELDS = {}
  FIELD_PROPS_TRANSFORMERS = {}
  FIELD_RENDERER = undefined
  FORM_COMPONENT = class extends React.Component<INativeFormProps> {
    public static defaultProps = {
      component: 'form'
    }

    public static displayName = 'Form'

    public render() {
      const { formRef, component, ...props } = this.props
      return React.createElement(component, {
        ...props,
        ref: formRef
      })
    }
  }
}

export const registerFormField = (
  name: string,
  component: ComponentWithStyleComponent<IFieldProps>,
  notWrapper?: boolean
) => {
  if (
    isNotEmptyStr(name) &&
    (isFn(component) || typeof component.styledComponentId === 'string')
  ) {
    if (notWrapper) {
      FORM_FIELDS[lowercase(name)] = component
      FORM_FIELDS[lowercase(name)].registerMiddlewares = []
    } else {
      FORM_FIELDS[lowercase(name)] = compose(
        component,
        FIELD_WRAPPERS,
        true
      )
      FORM_FIELDS[lowercase(name)].registerMiddlewares = FIELD_WRAPPERS
    }
    FORM_FIELDS[lowercase(name)].displayName = pascalCase(name)
  }
}

export const registerFormFields = (fields: IRegisteredFieldsMap) => {
  each(fields, (component, name) => {
    registerFormField(name, component)
  })
}

export const registerFieldMiddleware = (...wrappers: any[]) => {
  FIELD_WRAPPERS = FIELD_WRAPPERS.concat(wrappers)
  each(FORM_FIELDS, (component, key) => {
    if (
      !component.registerMiddlewares.some(
        wrapper => wrappers.indexOf(wrapper) > -1
      )
    ) {
      FORM_FIELDS[key] = compose(
        FORM_FIELDS[key],
        wrappers,
        true
      )
      FORM_FIELDS[key].registerMiddlewares = FIELD_WRAPPERS
    }
  })
}

export const registerFormWrapper = (...wrappers: any[]) => {
  FORM_COMPONENT = wrappers.reduce((buf, fn, index) => {
    const comp = isFn(fn) ? fn(buf) : buf
    comp.displayName = `FormWrapperLevel${index}`
    return comp
  }, FORM_COMPONENT)
}

export const registerFieldRenderer = (renderer: React.ComponentType) => {
  FIELD_RENDERER = renderer
}

// TODO transformer type
export const registerFormFieldPropsTransformer = (
  name: string,
  transformer
) => {
  if (isFn(transformer)) {
    FIELD_PROPS_TRANSFORMERS[name] = transformer
  }
}

export const getFormFieldPropsTransformer = (name: string) =>
  FIELD_PROPS_TRANSFORMERS[name]

export const getFormField = (name: string) => {
  return FORM_FIELDS[name]
}

export const getFieldRenderer = () => FIELD_RENDERER

export const OriginForm = React.forwardRef(
  (props: ISchemaFormProps, ref: React.Ref<any>) =>
    React.createElement(FORM_COMPONENT, { ...props, ref })
)
