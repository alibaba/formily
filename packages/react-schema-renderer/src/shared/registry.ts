import { isFn, lowercase, reduce, each, deprecate, log } from '@formily/shared'
import {
  ComponentWithStyleComponent,
  ISchemaFieldWrapper,
  ISchemaFormRegistry,
  ISchemaFieldComponent,
  ISchemaFieldComponentProps,
  ISchemaVirtualFieldComponentProps
} from '../types'
import pascalCase from 'pascal-case'

const registry: ISchemaFormRegistry = {
  fields: {},
  virtualFields: {},
  wrappers: [],
  formItemComponent: ({ children }) => children,
  formComponent: 'form'
}

export const getRegistry = () => {
  return {
    fields: registry.fields,
    virtualFields: registry.virtualFields,
    formItemComponent: registry.formItemComponent,
    formComponent: registry.formComponent
  }
}

export const cleanRegistry = () => {
  registry.fields = {}
  registry.virtualFields = {}
  registry.wrappers = []
}

export function registerFormComponent<Props = any>(
  component: React.JSXElementConstructor<Props>
) {
  if (isFn(component)) {
    registry.formComponent = component
  }
}

function compose<T, P>(payload: T, args: P[], revert: boolean) {
  return reduce(
    args,
    (buf: T, fn: P) => {
      return isFn(fn) ? fn(buf) : buf
    },
    payload,
    revert
  )
}

export function registerFormField(
  name: string,
  component: ComponentWithStyleComponent<ISchemaFieldComponentProps>,
  noWrapper: boolean = false
) {
  if (
    name &&
    (isFn(component) || typeof component.styledComponentId === 'string')
  ) {
    name = lowercase(name)
    if (registry.fields[name]) {
      log.warn(
        'Component registration naming conflict. Please change the name. Globally registered components will no longer support overlay registration in the future.'
      )
    }
    if (noWrapper) {
      registry.fields[name] = component
      registry.fields[name].__WRAPPERS__ = []
    } else {
      registry.fields[name] = compose(component, registry.wrappers, true)
      registry.fields[name].__WRAPPERS__ = registry.wrappers
    }
    registry.fields[name].displayName = pascalCase(name)
  }
}

export function registerFormFields(object: ISchemaFormRegistry['fields']) {
  each<ISchemaFormRegistry['fields'], ISchemaFieldComponent>(
    object,
    (component, key) => {
      registerFormField(key, component)
    }
  )
}

export function registerVirtualBox(
  name: string,
  component: ComponentWithStyleComponent<ISchemaVirtualFieldComponentProps>
) {
  if (
    name &&
    (isFn(component) || typeof component.styledComponentId === 'string')
  ) {
    name = lowercase(name)
    registry.virtualFields[name] = component
    registry.virtualFields[name].displayName = pascalCase(name)
  }
}

export function registerFormItemComponent(
  component: React.JSXElementConstructor<any>
) {
  if (isFn(component)) {
    registry.formItemComponent = component
  }
}

type FieldMiddleware = ISchemaFieldWrapper<ISchemaFieldComponentProps>

export const registerFieldMiddleware = deprecate<
  FieldMiddleware,
  FieldMiddleware,
  FieldMiddleware
>(function registerFieldMiddleware(
  ...wrappers: ISchemaFieldWrapper<ISchemaFieldComponentProps>[]
) {
  registry.wrappers = registry.wrappers.concat(wrappers)
  each<ISchemaFormRegistry['fields'], ISchemaFieldComponent>(
    registry.fields,
    (component, key) => {
      if (
        !component.__WRAPPERS__.some(wrapper => wrappers.indexOf(wrapper) > -1)
      ) {
        registry.fields[key] = compose(registry.fields[key], wrappers, true)
        registry.fields[key].__WRAPPERS__ = wrappers
      }
    }
  )
})
