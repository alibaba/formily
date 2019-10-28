import React from 'react'
import { isArr, each, isFn } from '@uform/shared'
import {
  ISchema,
  IConnectOptions,
  ISchemaFieldComponentProps,
  IConnectProps
} from '../types'

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
  effect: ISchema['x-effect'],
  notify: (type: string, payload?: any) => void
): any => {
  each(
    effect((type, payload) => notify(type, { payload }), { ...props }),
    (event, key) => {
      const prevEvent = key === 'onChange' ? props[key] : undefined
      props[key] = (...args: any[]) => {
        if (isFn(prevEvent)) {
          prevEvent(...args)
        }
        if (isFn(event)) {
          return event(...args)
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
      const {
        value,
        name,
        mutators,
        form,
        schema,
        editable,
        props
      } = fieldProps
      let componentProps: IConnectProps = {
        ...options.defaultProps,
        ...props['x-props'],
        ...props['x-component-props'],
        [options.valueName]: value,
        [options.eventName]: (event: any, ...args: any[]) => {
          mutators.change(
            options.getValueFromEvent
              ? options.getValueFromEvent.call(schema, event, ...args)
              : event,
            ...args
          )
        },
        onBlur: () => mutators.blur(),
        onFocus: () => mutators.focus()
      }
      if (editable !== undefined) {
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
        componentProps = bindEffects(componentProps, extendsEffect, form.notify)
      }

      if (isFn(options.getProps)) {
        const newProps = options.getProps(componentProps, fieldProps)
        if (newProps !== undefined) {
          componentProps = newProps as any
        }
      }

      if (isArr((props as ISchema).enum) && !componentProps.dataSource) {
        componentProps.dataSource = createEnum((props as ISchema).enum)
      }

      if (componentProps.editable !== undefined) {
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
