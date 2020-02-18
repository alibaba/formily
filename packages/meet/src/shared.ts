import React from 'react'
import { PreviewText } from '@formily/react-shared-components'
import {
  IConnectProps,
  MergedFieldComponentProps
} from '@formily/react-schema-renderer'
import { Select } from '@alifd/meet'
// import RadioSelect from './extends/RadioSelect'
export * from '@formily/shared'

export const mapSelectComponent = (
  Target: React.JSXElementConstructor<any>
  // props: any = {}
  // fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  // const { picker } = props
  // if (picker === 'radio') {
  //   return RadioSelect
  // }
  return Target
}

export const normalizeCol = (
  col: { span: number; offset?: number } | number,
  defaultValue?: { span: number }
): { span: number; offset?: number } => {
  if (!col) {
    return defaultValue
  } else {
    return typeof col === 'object' ? col : { span: Number(col) }
  }
}

export const mapTextComponent = (
  Target: React.JSXElementConstructor<any>,
  props: any = {},
  fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  const { editable } = fieldProps
  if (editable !== undefined) {
    if (editable === false) {
      return PreviewText
    }
  }
  if (Array.isArray(props.dataSource)) {
    return Select
  }
  return Target
}

export const acceptEnum = (component: React.JSXElementConstructor<any>) => {
  return ({ dataSource, ...others }) => {
    if (dataSource) {
      return React.createElement(Select, { dataSource, ...others })
    } else {
      return React.createElement(component, others)
    }
  }
}

export const transformDataSourceKey = (component, dataSourceKey) => {
  return ({ dataSource, ...others }) => {
    return React.createElement(component, {
      [dataSourceKey]: dataSource,
      ...others
    })
  }
}

export const mapStyledProps = (
  props: IConnectProps,
  fieldProps: MergedFieldComponentProps
) => {
  const { loading, errors } = fieldProps
  if (loading) {
    props.state = props.state || 'loading'
  } else if (errors && errors.length) {
    props.state = 'error'
  }
}

export const compose = (...args: any[]) => {
  return (payload: any, ...extra: any[]) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
}
