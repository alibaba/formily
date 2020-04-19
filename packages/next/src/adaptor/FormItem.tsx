import React, { createElement } from 'react'
import { Form } from '@alifd/next'
import {
  useDeepFormItem,
  useShallowFormItem,
  FormItemShallowProvider
} from '../context'
import MegaLayout from '../components/FormMegaLayout';
import { ISchemaFieldAdaptorProps } from '../types'
import { normalizeCol, pickFormItemProps } from '../shared'

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

const computeSchemaExtendProps = (props: ISchemaFieldAdaptorProps): any => {
  if (props.schema) {
    return pickFormItemProps({
      ...props.schema.getExtendsItemProps(),
      ...props.schema.getExtendsProps()
    })
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
  const formItemProps = pickFormItemProps(props)
  const schemaItemProps = computeSchemaExtendProps(props)

  const mergedProps = {
    ...formItemShallowProps,
    ...formItemProps,
    ...schemaItemProps
  }

  const { labelCol, wrapperCol } = mergedProps

  const addonAfter = mergedProps.addonAfter

  delete mergedProps.addonAfter

  const itemProps = {
    prefix,
    label,
    labelTextAlign,
    labelAlign: labelAlign || 'left',
    size,
    help,
    validateState: status,
    extra: <p>{extra}</p>,
    ...mergedProps,
    required: props.editable === false ? undefined : props.required,
    labelCol: label ? normalizeCol(labelCol || contextLabelCol) : undefined,
    wrapperCol: label ? normalizeCol(wrapperCol || contextWrapperCol) : undefined
  }

  const children = addonAfter ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FormItemShallowProvider>{props.children}</FormItemShallowProvider>
      {addonAfter}
    </div>
  ) : (
    <FormItemShallowProvider>{props.children}</FormItemShallowProvider>
  )

  return <MegaLayout.Item itemProps={itemProps} {...props}>
    {(megaComponentProps) => {
      if (megaComponentProps) {
        const hijectStyleChild = React.cloneElement(props.children, {
          ...props.children.props,
          props: {
            ...props.children.props.props,
            ['x-component-props']: {
              ...(props.children.props.props['x-component-props'] || {}),
              style: {
                ...(((props.children.props.props['x-component-props'] || {}).style) || {}),
                ...(megaComponentProps.style),
            },
          }
        }})

        return <FormItemShallowProvider>{hijectStyleChild}</FormItemShallowProvider>
      }

      return <Form.Item {...itemProps}>
        {children}
      </Form.Item>
    }}      
  </MegaLayout.Item>
}
