import React from 'react'
import { Form } from '@alifd/next'
import { useFormItem } from './context'
import { ISchemaFieldComponentProps } from '@uform/react-schema-renderer'
import { ItemProps } from '@alifd/next/types/form'
import { IFormItemTopProps } from '../types'

type CompatItemProps = ItemProps & Partial<ISchemaFieldComponentProps>

const computeStatus = (props: CompatItemProps) => {
  if (props.invalid) {
    return 'error'
  }
  if (props.loading) {
    return 'loading'
  }
}

const computeHelp = (props: CompatItemProps) => {
  return [].concat(props.errors, props.warnings)
}

const computeLabel = (props: CompatItemProps) => {
  if (props.schema && props.schema.title) {
    return props.schema.title
  }
}

const computeExtra = (props: CompatItemProps) => {
  if (props.schema && props.schema.description) {
    return props.schema.description
  }
}

function pickProps<T = {}>(obj: T, ...keys: (keyof T)[]): Pick<T, keyof T> {
  const result: Pick<T, keyof T> = {} as any
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = obj[keys[i]]
  }
  return result
}

const computeSchemaExtendProps = (
  props: CompatItemProps
): IFormItemTopProps => {
  if (props.schema) {
    return pickProps(
      {
        ...props.schema.getExtendsItemProps(),
        ...props.schema.getExtendsProps()
      },
      'prefix',
      'labelAlign',
      'labelTextAlign',
      'size',
      'labelCol',
      'wrapperCol'
    )
  }
}

export const CompatNextFormItem: React.FC<CompatItemProps> = props => {
  const {
    prefix,
    labelAlign,
    labelCol,
    labelTextAlign,
    wrapperCol,
    size
  } = useFormItem()
  const help = computeHelp(props)
  const label = computeLabel(props)
  const status = computeStatus(props)
  const extra = computeExtra(props)
  const itemProps = computeSchemaExtendProps(props)
  return (
    <Form.Item
      prefix={prefix}
      label={label}
      labelTextAlign={labelTextAlign}
      labelCol={labelCol}
      labelAlign={labelAlign}
      required={props.required}
      wrapperCol={wrapperCol}
      size={size}
      help={help}
      validateState={status}
      extra={extra}
      {...itemProps}
    >
      {props.children}
    </Form.Item>
  )
}
