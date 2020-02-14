import React, { createElement } from 'react'
import { Form } from '@alifd/next'
import {
  useDeepFormItem,
  useShallowFormItem,
  FormItemShallowProvider
} from '../context'
import { IFormItemTopProps, ISchemaFieldAdaptorProps } from '../types'
import { normalizeCol } from '../shared'

const computeStatus = (props: ISchemaFieldAdaptorProps) => {
  if (props.loading) {
    return 'loading'
  }
  if (props.invalid) {
    return 'error'
  }
  if (props.warnings && props.warnings.length) {
    return 'warning'
  }
}

const computeHelp = (props: ISchemaFieldAdaptorProps) => {
  if (props.help) return props.help
  const messages = [].concat(props.errors || [], props.warnings || [])
  return messages.length
    ? messages.map((message, index) =>
        createElement(
          'span',
          { key: index },
          message,
          messages.length - 1 > index ? ' ,' : ''
        )
      )
    : props.schema && props.schema.description
}

const computeLabel = (props: ISchemaFieldAdaptorProps) => {
  if (props.label) return props.label
  if (props.schema && props.schema.title) {
    return props.schema.title
  }
}

const computeExtra = (props: ISchemaFieldAdaptorProps) => {
  if (props.extra) return props.extra
}

function pickProps<T = {}>(obj: T, ...keys: (keyof T)[]): Pick<T, keyof T> {
  const result: Pick<T, keyof T> = {} as any
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] !== undefined) {
      result[keys[i]] = obj[keys[i]]
    }
  }
  return result
}

const computeSchemaExtendProps = (
  props: ISchemaFieldAdaptorProps
): IFormItemTopProps => {
  if (props.schema) {
    return pickProps(
      {
        ...props.schema.getExtendsItemProps(),
        ...props.schema.getExtendsProps()
      },
      'required',
      'className',
      'prefix',
      'labelAlign',
      'labelTextAlign',
      'size',
      'labelCol',
      'wrapperCol'
    )
  }
}

export const NextSchemaFieldAdaptor: React.FC<ISchemaFieldAdaptorProps> = props => {
  const {
    prefix,
    labelAlign,
    labelTextAlign,
    labelCol: contextLabelCol,
    wrapperCol: contextWrapperCol,
    size
  } = useDeepFormItem()
  const formItemShallowProps = useShallowFormItem()
  const help = computeHelp(props)
  const label = computeLabel(props)
  const status = computeStatus(props)
  const extra = computeExtra(props)
  const itemProps = computeSchemaExtendProps(props)

  const mergedProps = {
    ...itemProps,
    ...formItemShallowProps
  }

  const { labelCol, wrapperCol } = mergedProps

  return (
    <Form.Item
      prefix={prefix}
      label={label}
      labelTextAlign={labelTextAlign}
      labelAlign={labelAlign || 'left'}
      required={props.required}
      size={size}
      help={help}
      validateState={status}
      extra={<p>{extra}</p>}
      {...mergedProps}
      labelCol={label ? normalizeCol(labelCol || contextLabelCol) : undefined}
      wrapperCol={
        label ? normalizeCol(wrapperCol || contextWrapperCol) : undefined
      }
    >
      <FormItemShallowProvider>{props.children}</FormItemShallowProvider>
    </Form.Item>
  )
}
