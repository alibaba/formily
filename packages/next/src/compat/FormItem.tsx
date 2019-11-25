import React, { createContext } from 'react'
import { Form } from '@alifd/next'
import { useFormItem } from './context'
import { IFormItemTopProps, ICompatItemProps } from '../types'
import { normalizeCol } from '../shared'
import { useContext } from 'react'

const computeStatus = (props: ICompatItemProps) => {
  if (props.loading) {
    return 'loading'
  }
  if (props.invalid) {
    return 'error'
  }
  //todo:暂时不支持
  // if (props.warnings.length) {
  //   return 'warning'
  // }
}

const computeHelp = (props: ICompatItemProps) => {
  if (props.help) return props.help
  const messages = [].concat(props.errors || [], props.warnings || [])
  return messages.length ? messages : props.schema && props.schema.description
}

const computeLabel = (props: ICompatItemProps) => {
  if (props.label) return props.label
  if (props.schema && props.schema.title) {
    return props.schema.title
  }
}

const computeExtra = (props: ICompatItemProps) => {
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
  props: ICompatItemProps
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

const FormItemPropsContext = createContext({})

export const FormItemProps = ({ children, ...props }) => (
  <FormItemPropsContext.Provider value={props}>
    {children}
  </FormItemPropsContext.Provider>
)

export const CompatNextFormItem: React.FC<ICompatItemProps> = props => {
  const {
    prefix,
    labelAlign,
    labelCol,
    labelTextAlign,
    wrapperCol,
    size
  } = useFormItem()
  const formItemProps = useContext(FormItemPropsContext)
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
      labelCol={label ? normalizeCol(labelCol) : undefined}
      labelAlign={labelAlign || 'left'}
      required={props.required}
      wrapperCol={label ? normalizeCol(wrapperCol) : undefined}
      size={size}
      help={help}
      validateState={status}
      extra={<p>{extra}</p>}
      {...itemProps}
      {...formItemProps}
    >
      <FormItemProps>{props.children}</FormItemProps>
    </Form.Item>
  )
}
