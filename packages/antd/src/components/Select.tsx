import React from 'react'
import { Select as AntSelect } from 'antd'
import { SelectProps as AntSelectProps } from 'antd/lib/select'
import styled from 'styled-components'

type SelectOption = {
  label: React.ReactText
  value: any
  [key: string]: any
}

type SelectProps = AntSelectProps & {
  dataSource?: SelectOption[]
}

export const Select: React.FC<SelectProps> = styled((props: SelectProps) => {
  const { dataSource = [], ...others } = props
  const children = dataSource.map((item, index) => {
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
