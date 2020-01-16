import React, { createContext, createElement } from 'react'
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
  if (props.warnings && props.warnings.length) {
    return 'warning'
  }
}

const computeHelp = (props: ICompatItemProps) => {
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

const FormItemPropsContext = createContext({})

export const CompatNextFormItemProps = ({ children, ...props }) => (
  <FormItemPropsContext.Provider value={props}>
    {children}
  </FormItemPropsContext.Provider>
)

export const CompatNextFormItem: React.FC<ICompatItemProps> = props => {
  const {
    prefix,
    labelAlign,
    labelTextAlign,
    labelCol: contextLabelCol,
    wrapperCol: contextWrapperCol,
    size
  } = useFormItem()
  const formItemProps = useContext(FormItemPropsContext)
  const help = computeHelp(props)
  const label = computeLabel(props)
  const status = computeStatus(props)
  const extra = computeExtra(props)
  const itemProps = computeSchemaExtendProps(props)

  const mergedProps = {
    ...itemProps,
    ...formItemProps,
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
      wrapperCol={label ? normalizeCol(wrapperCol || contextWrapperCol) : undefined}
    >
      <CompatNextFormItemProps>{props.children}</CompatNextFormItemProps>
    </Form.Item>
  )
}
