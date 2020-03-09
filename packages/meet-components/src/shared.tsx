import React from 'react'
import {
  mapTextComponent,
  mapStyledProps,
  normalizeCol,
  mapSelectComponent
} from '@formily/meet'
import { Select as MeetSelect } from '@alifd/meet'
import { SelectComponent as MeetSelectProps } from '@alifd/meet/types/select'
import styled from 'styled-components'
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

type SelectProps = MeetSelectProps & {
  dataSource?: SelectOption[]
}

const Select: React.FC<SelectProps> = styled((props: SelectProps) => {
  const { dataSource = [], ...others } = props
  const children = dataSource.map(item => {
    const { label, value, ...others } = item
    return (
      <MeetSelect key={value} {...others} title={label as string} value={value}>
        {label}
      </MeetSelect>
    )
  })
  return (
    <MeetSelect className={props.className} {...others}>
      {children}
    </MeetSelect>
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

export { mapTextComponent, mapStyledProps, normalizeCol, mapSelectComponent }
