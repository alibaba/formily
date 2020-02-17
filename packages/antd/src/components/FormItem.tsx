import React from 'react'
import { Form as AntdForm } from 'antd'
import { InternalField, connect } from '@formily/react-schema-renderer'
import { normalizeCol } from '../shared'
import { useDeepFormItem } from '../context'
import { IAntdFormItemProps } from '../types'
const { Item: AntdFormItem } = AntdForm

const computeStatus = (props: any) => {
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

const computeMessage = (errors: any[], warnings: any[]) => {
  const messages = [].concat(errors || [], warnings || [])
  return messages.length
    ? messages.map((message, index) =>
        React.createElement(
          'span',
          { key: index },
          message,
          messages.length - 1 > index ? ' ,' : ''
        )
      )
    : undefined
}

const ConnectedComponent = Symbol('connected')

export const FormItem: React.FC<IAntdFormItemProps> = topProps => {
  const {
    name,
    initialValue,
    value,
    visible,
    display,
    required,
    editable,
    triggerType,
    valueName,
    eventName,
    getValueFromEvent,
    rules,
    children,
    component,
    props,
    ...itemProps
  } = topProps || {}
  const topFormItemProps = useDeepFormItem()

  const renderComponent = ({ props, state, mutators, form }) => {
    if (!component) return <div>Can not fount component.</div>
    if (!component['__ALREADY_CONNECTED__']) {
      component[ConnectedComponent] = connect({
        eventName,
        valueName,
        getValueFromEvent
      })(component)
    }
    return React.createElement(
      component['__ALREADY_CONNECTED__']
        ? component
        : component[ConnectedComponent],
      {
        ...state,
        props: {
          ['x-component-props']: props
        },
        form,
        mutators
      },
      children
    )
  }

  return (
    <InternalField
      name={name}
      initialValue={initialValue}
      value={value}
      visible={visible}
      display={display}
      required={required}
      rules={rules}
      editable={editable}
      triggerType={triggerType}
      props={{ ...topFormItemProps, ...itemProps, ...props }}
    >
      {({ form, state, mutators }) => {
        const {
          props: {
            label,
            labelCol,
            labelAlign,
            wrapperCol,
            prefixCls,
            extra,
            help,
            inline,
            hasFeedback,
            itemStyle,
            itemClassName,
            ...props
          },
          errors,
          editable,
          warnings,
          required
        } = state
        return (
          <AntdFormItem
            prefixCls={prefixCls}
            hasFeedback={hasFeedback}
            className={itemClassName}
            style={itemStyle}
            extra={extra}
            label={label}
            required={editable ? required : undefined}
            labelCol={label ? normalizeCol(labelCol) : undefined}
            labelAlign={labelAlign}
            wrapperCol={label ? normalizeCol(wrapperCol) : undefined}
            validateStatus={computeStatus(state)}
            help={computeMessage(errors, warnings) || help}
          >
            {renderComponent({ props, state, mutators, form })}
          </AntdFormItem>
        )
      }}
    </InternalField>
  )
}
