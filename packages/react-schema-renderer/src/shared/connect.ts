import React from 'react'
import { isArr, each, isFn, isValid } from '@formily/shared'
import {
  ISchema,
  IConnectOptions,
  ISchemaFieldComponentProps,
  IConnectProps
} from '../types'
import { Schema } from './schema'

const createEnum = (enums: any) => {
  if (isArr(enums)) {
    return enums.map(item => {
      if (typeof item === 'object') {
        return {
          ...item
        }
      } else {
        return {
          ...item,
          label: item,
          value: item
        }
      }
    })
  }

  return []
}

const bindEffects = (
  props: {},
  fieldProps: ISchemaFieldComponentProps,
  effect: ISchema['x-effect'],
  notify: (type: string, payload?: any) => void
): any => {
  each(
    effect(
      (type, payload) =>
        notify(type, { payload, name: fieldProps.name, path: fieldProps.path }),
      { ...props }
    ),
    (event, key) => {
      const prevEvent = key === 'onChange' ? props[key] : undefined
      props[key] = (...args: any[]) => {
        if (isFn(event)) {
          event(...args)
        }
        if (isFn(prevEvent)) {
          return prevEvent(...args)
        }
      }
    }
  )
  return props
}

export const connect = (options?: IConnectOptions) => {
  options = {
    valueName: 'value',
    eventName: 'onChange',
    ...options
  }
  return (Component: React.JSXElementConstructor<any>) => {
    return (fieldProps: ISchemaFieldComponentProps) => {
      const { value, name, mutators, form, editable, props } = fieldProps
      const schema = new Schema(props)
      const schemaComponentProps = schema.getExtendsComponentProps()
      let componentProps: IConnectProps = {
        ...options.defaultProps,
        ...schemaComponentProps,
        [options.valueName]: value,
        [options.eventName]: (event: any, ...args: any[]) => {
          mutators.change(
            options.getValueFromEvent
              ? options.getValueFromEvent.call(schema, event, ...args)
              : event,
            ...args
          )
          if (isFn(schemaComponentProps[options.eventName])) {
            schemaComponentProps[options.eventName](event, ...args)
          }
        },
        onBlur: () => mutators.blur(),
        onFocus: () => mutators.focus()
      }
      if (isValid(editable)) {
        if (isFn(editable)) {
          if (!editable(name)) {
            componentProps.disabled = true
            componentProps.readOnly = true
          }
        } else if (editable === false) {
          componentProps.disabled = true
          componentProps.readOnly = true
        }
      }

      const extendsEffect = schema.getExtendsEffect()
      if (isFn(extendsEffect)) {
        componentProps = bindEffects(
          componentProps,
          fieldProps,
          extendsEffect,
          form.notify
        )
      }

      if (isFn(options.getProps)) {
        const newProps = options.getProps(componentProps, fieldProps)
        if (isValid(newProps)) {
          componentProps = newProps as any
        }
      }

      if (isArr((props as ISchema).enum) && !componentProps.dataSource) {
        componentProps.dataSource = createEnum((props as ISchema).enum)
      }

      if (isValid(componentProps.editable)) {
        delete componentProps.editable
      }

      return React.createElement(
        isFn(options.getComponent)
          ? options.getComponent(Component, props, fieldProps)
          : Component,
        componentProps
      )
    }
  }
}
