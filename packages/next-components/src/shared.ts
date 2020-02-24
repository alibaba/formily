import React from 'react'
import { mapTextComponent, mapStyledProps, normalizeCol } from '@formily/next'
import { Select } from '@alifd/next'
export * from '@formily/shared'

export const compose = (...args: any[]) => {
  return (payload: any, ...extra: any[]) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
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

export { mapTextComponent, mapStyledProps, normalizeCol }
