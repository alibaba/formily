import * as React from 'react'
import pascalCase from 'pascal-case'

import { SchemaFormProps } from '../type'
import { isFn, isNotEmptyStr, lowercase, each, compose } from '../utils'

// 最原生的 Form，用到了 DOM 的 form 标签
export interface NativeFormProps {
  component: string
  formRef?: React.Ref<any>
}

export interface RegisteredFieldsMap {
  [name: string]: React.ComponentType
}

// TODO 下面两个接口能不能合并成一个
export interface FunctionComponentWithStyleComponent extends React.FunctionComponent {
  styledComponentId?: string
}

export interface ComponentClassWithStyleComponent extends React.ComponentClass {
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
  FORM_COMPONENT = class extends React.Component<NativeFormProps> {
    static defaultProps = {
      component: 'form'
    }

    static displayName = 'Form'

    render() {
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
  component: FunctionComponentWithStyleComponent | ComponentClassWithStyleComponent,
  notWrapper?: boolean
) => {
  if (isNotEmptyStr(name) && (isFn(component) || typeof component.styledComponentId === 'string')) {
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

export const registerFormFields = (fields: RegisteredFieldsMap) => {
  each(fields, (component, name) => {
    registerFormField(name, component)
  })
}

export const registerFieldMiddleware = (...wrappers: any[]) => {
  FIELD_WRAPPERS = FIELD_WRAPPERS.concat(wrappers)
  each(FORM_FIELDS, (component, key) => {
    if (!component.registerMiddlewares.some(wrapper => wrappers.indexOf(wrapper) > -1)) {
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
    let comp = isFn(fn) ? fn(buf) : buf
    comp.displayName = `FormWrapperLevel${index}`
    return comp
  }, FORM_COMPONENT)
}

export const registerFieldRenderer = (renderer: React.ComponentType) => {
  FIELD_RENDERER = renderer
}

// TODO transformer type
export const registerFormFieldPropsTransformer = (name: string, transformer) => {
  if (isFn(transformer)) {
    FIELD_PROPS_TRANSFORMERS[name] = transformer
  }
}

export const getFormFieldPropsTransformer = (name: string) => FIELD_PROPS_TRANSFORMERS[name]

export const getFormField = (name: string) => {
  return FORM_FIELDS[name]
}

export const getFieldRenderer = () => FIELD_RENDERER

export const OriginForm = React.forwardRef((props: SchemaFormProps, ref: React.Ref<any>) =>
  React.createElement(FORM_COMPONENT, { ...props, ref })
)
