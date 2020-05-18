import React, { createElement } from 'react'
import { Form } from 'antd'
import {
  useDeepFormItem,
  FormItemShallowProvider,
  useShallowFormItem
} from '../context'
import { ISchemaFieldAdaptorProps } from '../types'
import { normalizeCol, pickFormItemProps } from '../shared'
import { MegaLayoutItem } from '../components/FormMegaLayout/index'

const computeStatus = (props: ISchemaFieldAdaptorProps) => {
  if (props.loading) {
    return 'validating'
  }
  if (props.invalid) {
    return 'error'
  }
  if (props.warnings && props.warnings.length) {
    return 'warning'
  }
  return ''
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

const computeSchemaExtendProps = (props: ISchemaFieldAdaptorProps) => {
  if (props.schema) {
    return pickFormItemProps({
      ...props.schema.getExtendsItemProps(),
      ...props.schema.getExtendsProps()
    })
  }
}

export const AntdSchemaFieldAdaptor: React.FC<ISchemaFieldAdaptorProps> = props => {
  const {
    prefixCls,
    labelAlign,
    labelCol: contextLabelCol,
    wrapperCol: contextWrapperCol,
    size,
  } = useDeepFormItem()
  const help = computeHelp(props)
  const label = computeLabel(props)
  const status = computeStatus(props)
  const extra = computeExtra(props)
  const formItemProps = pickFormItemProps(props)
  const schemaItemProps = computeSchemaExtendProps(props)
  const formItemShallowProps = useShallowFormItem()

  const mergedProps = {
    label,
    ...formItemShallowProps,
    ...formItemProps,
    ...schemaItemProps
  }

  const { labelCol, wrapperCol } = mergedProps

  const addonAfter = mergedProps.addonAfter

  delete mergedProps.addonAfter

  const itemProps = {
    prefixCls,
    labelAlign,
    help,
    validateStatus: status,
    extra: extra ? <p>{extra}</p> : undefined,
    ...mergedProps,
    required: props.editable === false ? undefined : props.required,
    labelCol: label ? normalizeCol(labelCol || contextLabelCol) : {},
    wrapperCol: label ? normalizeCol(wrapperCol || contextWrapperCol) : {}
  }

  const renderComponent = (children, opts?) => {
    const { addonAfter } = opts || {}
    return addonAfter ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormItemShallowProvider>{children}</FormItemShallowProvider>
        {addonAfter}
      </div>
    ) : (
      <FormItemShallowProvider>{children}</FormItemShallowProvider>
    )
  }

  return <MegaLayoutItem itemProps={{...itemProps, size, }} {...props.props} schemaChildren={props.children}>
    {(megaComponent) => {
      if (megaComponent) {
        return renderComponent(megaComponent, { addonAfter })
      }

      return <Form.Item {...itemProps}>
        {renderComponent(props.children, { addonAfter })}
      </Form.Item>
    }}      
  </MegaLayoutItem>
}
