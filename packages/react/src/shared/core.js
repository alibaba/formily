import React from 'react'
import pascalCase from 'pascal-case'
import { isFn, isStr, lowercase, each, compose } from '../utils'
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
  FORM_COMPONENT = class extends React.Component {
    static defaultProps = {
      component: 'form'
    }
    render() {
      const { formRef, component, ...props } = this.props
      return React.createElement(component, {
        ...props,
        ref: formRef
      })
    }
  }
  FORM_COMPONENT.displayName = 'Form'
}

export const registerFormField = (name, component, notWrapper) => {
  if (
    isStr(name) &&
    name &&
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

export const registerFormFields = object => {
  each(object, (component, name) => {
    registerFormField(name, component)
  })
}

export const registerFieldMiddleware = (...wrappers) => {
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

export const registerFormWrapper = (...wrappers) => {
  FORM_COMPONENT = wrappers.reduce((buf, fn, index) => {
    let comp = isFn(fn) ? fn(buf) : buf
    comp.displayName = `FormWrapperLevel${index}`
    return comp
  }, FORM_COMPONENT)
}

export const registerFieldRenderer = renderer => {
  FIELD_RENDERER = renderer
}

export const registerFormFieldPropsTransformer = (name, transformer) => {
  if (isFn(transformer)) {
    FIELD_PROPS_TRANSFORMERS[name] = transformer
  }
}

export const getFormFieldPropsTransformer = name =>
  FIELD_PROPS_TRANSFORMERS[name]

export const getFormField = name => {
  return FORM_FIELDS[name]
}

export const getFieldRenderer = () => FIELD_RENDERER

export const OriginForm = React.forwardRef((props, ref) =>
  React.createElement(FORM_COMPONENT, { ...props, ref })
)
