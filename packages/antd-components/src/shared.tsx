import React from 'react'
import { mapTextComponent, mapStyledProps, normalizeCol } from '@formily/antd'
import { Select as AntSelect } from 'antd'
import { SelectProps as AntSelectProps } from 'antd/lib/select'
import styled from 'styled-components'
import { isArr } from '@formily/shared'
export * from '@formily/shared'

export const compose = (...args: any[]) => {
  return (payload: any, ...extra: any[]) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
}

interface SelectOption {
  label: React.ReactText
  value: any
  [key: string]: any
}

type SelectProps = AntSelectProps & {
  dataSource?: SelectOption[]
}

const createEnum = (enums: any) => {
  if (isArr(enums)) {
    return enums.map(item => {
      if (typeof item === 'object') {
        return {
          ...item
        }
      } else {
        return {
          label: item,
          value: item
        }
      }
    })
  }

  return []
}

export const Select: React.FC<SelectProps> = styled((props: SelectProps) => {
  const { dataSource = [], ...others } = props
  const children = createEnum(dataSource).map(item => {
    const { label, value, ...others } = item
    return (
      <AntSelect.Option
        key={value}
        {...others}
        title={label as string}
        value={value}
      >
        {label}
      </AntSelect.Option>
    )
  })
  return (
    <AntSelect className={props.className} {...others}>
      {children}
    </AntSelect>
  )
})`
  min-width: 100px;
  width: 100%;
`
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

export { mapTextComponent, mapStyledProps, normalizeCol }
