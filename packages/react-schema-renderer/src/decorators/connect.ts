import React, { PureComponent } from 'react'
import { ISchema, Dispatcher } from '@uform/types'
import { isArr, isFn, each } from '../utils'
import { IEventTargetOption, IFieldProps } from '../type'

const isEvent = (candidate: React.SyntheticEvent): boolean =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault)

const isReactNative =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.product &&
  window.navigator.product === 'ReactNative'

const getSelectedValues = (options?: IEventTargetOption[]) => {
  const result = []
  if (options) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.selected) {
        result.push(option.value)
      }
    }
  }
  return result
}

// TODO 需要 any ?
const getValue = (
  event: React.SyntheticEvent | any,
  isReactNative: boolean
) => {
  if (isEvent(event)) {
    if (
      !isReactNative &&
      event.nativeEvent &&
      event.nativeEvent.text !== undefined
    ) {
      return event.nativeEvent.text
    }
    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text
    }

    const detypedEvent = event
    const {
      target: { type, value, checked, files },
      dataTransfer
    } = detypedEvent

    if (type === 'checkbox') {
      return !!checked
    }

    if (type === 'file') {
      return files || (dataTransfer && dataTransfer.files)
    }

    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options)
    }
    return value
  }
  return event
}

const createEnum = (enums: any, enumNames: string | any[]) => {
  if (isArr(enums)) {
    return enums.map((item, index) => {
      if (typeof item === 'object') {
        return {
          ...item
        }
      } else {
        return {
          ...item,
          label: isArr(enumNames) ? enumNames[index] || item : item,
          value: item
        }
      }
    })
  }

  return []
}

const bindEffects = (
  props: IConnectProps,
  effect: ISchema['x-effect'],
  dispatch: Dispatcher
) => {
  each(effect(dispatch, { ...props }), (event, key) => {
    const prevEvent = key === 'onChange' ? props[key] : undefined
    props[key] = (...args) => {
      if (isFn(prevEvent)) {
        prevEvent(...args)
      }
      if (isFn(event)) {
        return event(...args)
      }
    }
  })
  return props
}

// 这个不枚举了，因为是 x-props 的
export interface IConnectProps extends IFieldProps {
  disabled?: boolean
  readOnly?: boolean
  showTime?: boolean
  dataSource?: any[]
  [name: string]: any
}

export interface IConnectOptions<T> {
  valueName?: string
  eventName?: string
  defaultProps?: object
  getValueFromEvent?: (event?: any, value?: any) => any
  getProps?: (
    props: IConnectProps,
    componentProps: IFieldProps
  ) => IConnectProps | void
  getComponent?: (
    Target: T,
    props,
    {
      editable,
      name
    }: { editable: boolean | ((name: string) => boolean); name: string }
  ) => T
}

export const connect = <T extends React.ComponentType<IFieldProps>>(
  opts?: IConnectOptions<T>
) => (Target: T): React.ComponentClass<IFieldProps> => {
  opts = {
    valueName: 'value',
    eventName: 'onChange',
    ...opts
  }
  return class extends PureComponent<IFieldProps> {
    render() {
      const { value, name, mutators, schema, editable } = this.props

      let props = {
        ...opts.defaultProps,
        ...schema['x-props'],
        [opts.valueName]: value,
        [opts.eventName]: (event, ...args) => {
          mutators.change(
            opts.getValueFromEvent
              ? opts.getValueFromEvent.call(
                  { props: schema['x-props'] || {} },
                  event,
                  ...args
                )
              : getValue(event, isReactNative)
          )
        }
      } as IConnectProps

      if (editable !== undefined) {
        if (isFn(editable)) {
          if (!editable(name)) {
            props.disabled = true
            props.readOnly = true
          }
        } else if (editable === false) {
          props.disabled = true
          props.readOnly = true
        }
      }

      if (isFn(schema['x-effect'])) {
        props = bindEffects(props, schema['x-effect'], mutators.dispatch)
      }

      if (isFn(opts.getProps)) {
        const newProps = opts.getProps(props, this.props)
        if (newProps !== undefined) {
          // @ts-ignore TODO
          props = newProps
        }
      }

      if (isArr(schema.enum) && !props.dataSource) {
        props.dataSource = createEnum(schema.enum, schema.enumNames)
      }

      if (props.editable !== undefined) {
        delete props.editable
      }

      return React.createElement(
        isFn(opts.getComponent)
          ? opts.getComponent(Target, props, this.props)
          : Target,
        props
      )
    }
  }
}
