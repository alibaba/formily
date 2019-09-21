import React, { useContext, Fragment } from 'react'
import { Field, VirtualField } from '@uform/react'
import {
  FormPath,
  isFn,
  lowercase,
  reduce,
  each,
  isStr,
  deprecate
} from '@uform/shared'
import pascalCase from 'pascal-case'
import {
  ISchemaFieldProps,
  ComponentWithStyleComponent,
  ISchemaFieldComponentProps,
  IFieldStore,
  ISchemaFieldWrapper,
  ISchemaVirtualFieldComponentProps,
  ISchemaFieldComponent
} from '../types'
import { Schema } from '../shared/schema'
import SchemaContext, { FormItemContext } from '../context'

const store: IFieldStore = {
  fields: {},
  virtualFields: {},
  wrappers: []
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

export const cleanup = () => {
  store.fields = {}
  store.virtualFields = {}
  store.wrappers = []
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
    if (noWrapper) {
      store.fields[name] = component
      store.fields[name].__WRAPPERS__ = []
    } else {
      store.fields[name] = compose(
        component,
        store.wrappers,
        true
      )
      store.fields[name].__WRAPPERS__ = store.wrappers
    }
    store.fields[name].displayName = pascalCase(name)
  }
}

export function registerFormFields(object: IFieldStore['fields']) {
  each<IFieldStore['fields'], ISchemaFieldComponent>(
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
    store.virtualFields[name] = component
    store.virtualFields[name].displayName = pascalCase(name)
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
  each<IFieldStore['fields'], ISchemaFieldComponent>(
    store.fields,
    (component, key) => {
      if (
        !component.__WRAPPERS__.some(wrapper => wrappers.indexOf(wrapper) > -1)
      ) {
        store.fields[key] = compose(
          store.fields[key],
          wrappers,
          true
        )
        store.fields[key].__WRAPPERS__ = wrappers
      }
    }
  )
})

export const SchemaField: React.FunctionComponent<ISchemaFieldProps> = (
  props: ISchemaFieldProps
) => {
  const path = FormPath.parse(props.path)
  const formSchema = useContext(SchemaContext)
  const fieldSchema = formSchema.get(path)
  const formItemComponent = useContext(FormItemContext)
  if (!fieldSchema) {
    throw new Error(`Can not found schema node by ${path.toString()}.`)
  }
  const schemaType = fieldSchema.type
  const schemaComponent = fieldSchema.getExtendsComponent()
  const schemaRenderer = fieldSchema.getExtendsRenderer()
  const finalComponentName = schemaComponent || schemaType
  const renderField = (
    addtionKey: string | number,
    reactKey?: string | number
  ) => {
    return <SchemaField key={reactKey} path={path.concat(addtionKey)} />
  }
  if (fieldSchema.isObject() && !schemaComponent) {
    return (
      <Fragment>
        {fieldSchema.mapProperties((schema: Schema, key: string) => {
          const childPath = path.concat(key)
          return <SchemaField key={childPath.toString()} path={childPath} />
        })}
      </Fragment>
    )
  } else {
    if (isFn(finalComponentName)) {
      return (
        <Field
          path={path}
          initialValue={fieldSchema.default}
          props={fieldSchema.getSelfProps()}
          editable={fieldSchema.getExtendsEditable()}
          required={fieldSchema.getExtendsRequired()}
          rules={fieldSchema.getExtendsRules()}
        >
          {({ state, mutators, form }) => {
            const props: ISchemaFieldComponentProps = {
              ...state,
              schema: fieldSchema,
              path,
              form,
              mutators,
              renderField
            }
            return React.createElement(
              formItemComponent,
              props,
              React.createElement(finalComponentName, props)
            )
          }}
        </Field>
      )
    } else if (isStr(finalComponentName)) {
      if (store.fields[finalComponentName]) {
        return (
          <Field
            path={path}
            initialValue={fieldSchema.default}
            props={fieldSchema.getSelfProps()}
            editable={fieldSchema.getExtendsEditable()}
            required={fieldSchema.getExtendsRequired()}
            rules={fieldSchema.getExtendsRules()}
          >
            {({ state, mutators, form }) => {
              const props: ISchemaFieldComponentProps = {
                ...state,
                schema: fieldSchema,
                path,
                form,
                mutators,
                renderField
              }
              const renderComponent = (): React.ReactElement =>
                React.createElement(
                  formItemComponent,
                  props,
                  React.createElement(store.fields[finalComponentName], props)
                )
              if (isFn(schemaRenderer)) {
                return schemaRenderer({ ...props, renderComponent })
              }
              return renderComponent()
            }}
          </Field>
        )
      } else if (store.virtualFields[finalComponentName]) {
        return (
          <VirtualField path={path} props={fieldSchema.getSelfProps()}>
            {({ state, form }) => {
              const props: ISchemaVirtualFieldComponentProps = {
                ...state,
                schema: fieldSchema,
                path,
                form,
                renderField,
                children: fieldSchema.mapProperties(
                  (schema: Schema, key: string) => {
                    const childPath = path.concat(key)
                    return (
                      <SchemaField
                        key={childPath.toString()}
                        path={childPath}
                      />
                    )
                  }
                )
              }
              const renderComponent = () =>
                React.createElement(
                  store.virtualFields[finalComponentName],
                  props
                )
              if (isFn(schemaRenderer)) {
                return schemaRenderer({ ...props, renderComponent })
              }
              return renderComponent()
            }}
          </VirtualField>
        )
      } else {
        throw new Error(
          `Can not found any custom component in ${path.toString()}.`
        )
      }
    }
  }
}
