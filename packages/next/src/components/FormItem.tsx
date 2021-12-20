import React, { Fragment } from 'react'
import { Form as NextForm } from '@alifd/next'
import {
  InternalField,
  connect,
  InternalVirtualField
} from '@formily/react-schema-renderer'
import {
  normalizeCol,
  pickNotFormItemProps,
  pickFormItemProps,
  log
} from '../shared'
import { MegaLayoutItem } from './FormMegaLayout'
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

const ConnectedComponent = Symbol.for('connected')

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
    unmountRemoveValue,
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
    if (!component) {
      if (children) return <Fragment>{children}</Fragment>
      log.error(`Can't fount the component. Its key is ${name}.`)
      return null
    }
    if (!component['__ALREADY_CONNECTED__']) {
      component[ConnectedComponent] =
        component[ConnectedComponent] ||
        connect({
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

  const renderField = (fieldProps: any) => {
    const { form, state, mutators } = fieldProps
    const { props, errors, warnings, editable, required } = state
    const { labelCol, wrapperCol, help, addonBefore, addonAfter } = props
    const formItemProps = pickFormItemProps(props)
    const componentProps = pickNotFormItemProps(props)

    const itemProps = {
      ...formItemProps,
      required: editable === false ? undefined : required,
      labelCol: formItemProps.label ? normalizeCol(labelCol) : undefined,
      wrapperCol: formItemProps.label ? normalizeCol(wrapperCol) : undefined,
      validateState: computeStatus(state),
      help: computeMessage(errors, warnings) || help,
      addonBefore,
      addonAfter
    }

    return (
      <MegaLayoutItem itemProps={itemProps} {...props}>
        {megaComponentProps => {
          if (megaComponentProps) {
            return renderComponent({
              props: megaComponentProps,
              state,
              mutators,
              form
            })
          }
          const { addonBefore, addonAfter, ...otherItemProps } = itemProps
          return (
            <NextFormItem {...otherItemProps}>
              {renderComponent({
                props: componentProps,
                state,
                mutators,
                form
              })}
            </NextFormItem>
          )
        }}
      </MegaLayoutItem>
    )
  }

  if (!component && children) {
    return (
      <InternalVirtualField
        name={name}
        visible={visible}
        display={display}
        props={{ ...topFormItemProps, ...itemProps, ...props }}
      >
        {renderField}
      </InternalVirtualField>
    )
  }

  if (!name) {
    return <div>Form Item must have name property</div>
  }

  return (
    <InternalField
      name={name}
      initialValue={initialValue}
      unmountRemoveValue={unmountRemoveValue}
      value={value}
      visible={visible}
      display={display}
      required={required}
      rules={rules}
      editable={editable}
      triggerType={triggerType}
      props={{ ...topFormItemProps, ...itemProps, ...props }}
    >
      {renderField}
    </InternalField>
  )
}
