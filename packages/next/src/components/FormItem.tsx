import React from 'react'
import { Form as NextForm } from '@alifd/next'
import { InternalField, connect } from '@formily/react-schema-renderer'
import { normalizeCol } from '../shared'
import { useDeepFormItem } from '../context'
import { INextFormItemProps } from '../types'
const { Item: NextFormItem } = NextForm

const computeStatus = (props: any) => {
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

export const FormItem: React.FC<INextFormItemProps> = topProps => {
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
            labelTextAlign,
            labelCol,
            labelAlign,
            wrapperCol,
            prefix,
            extra,
            help,
            hasFeedback,
            size,
            itemStyle,
            itemClassName,
            asterisk,
            ...props
          },
          errors,
          warnings,
          required
        } = state
        return (
          <NextFormItem
            prefix={prefix}
            hasFeedback={hasFeedback}
            className={itemClassName}
            style={itemStyle}
            asterisk={asterisk}
            extra={extra}
            label={label}
            size={size}
            labelTextAlign={labelTextAlign}
            required={required}
            labelCol={label ? normalizeCol(labelCol) : undefined}
            labelAlign={labelAlign || 'left'}
            wrapperCol={label ? normalizeCol(wrapperCol) : undefined}
            validateState={computeStatus(state)}
            help={computeMessage(errors, warnings) || help}
          >
            {renderComponent({ props, state, mutators, form })}
          </NextFormItem>
        )
      }}
    </InternalField>
  )
}
