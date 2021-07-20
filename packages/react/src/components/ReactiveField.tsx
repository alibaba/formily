import React, { Fragment } from 'react'
import { observer } from '@formily/reactive-react'
import { isFn } from '@formily/shared'
import { isVoidField, GeneralField, Form } from '@formily/core'
interface IReactiveFieldProps {
  field: GeneralField
  children?:
    | ((field: GeneralField, form: Form) => React.ReactChild)
    | React.ReactNode
}

const ReactiveInternal: React.FC<IReactiveFieldProps> = (props) => {
  if (!props.field) {
    return (
      <Fragment>
        {isFn(props.children) ? props.children(null, null) : props.children}
      </Fragment>
    )
  }
  const field = props.field
  const children = isFn(props.children)
    ? props.children(props.field, props.field.form)
    : props.children
  if (field.display !== 'visible') return null

  const renderDecorator = (children: React.ReactNode) => {
    if (!field.decorator[0]) {
      return <Fragment>{children}</Fragment>
    }
    return React.createElement(
      field.decorator[0],
      {
        ...field.decorator[1],
        style: {
          ...field.decorator[1]?.style,
        },
      },
      children
    )
  }

  const renderComponent = () => {
    if (!field.component[0]) return <Fragment>{children}</Fragment>
    const value = !isVoidField(field) ? field.value : undefined
    const onChange = !isVoidField(field)
      ? (...args: any[]) => {
          field.onInput(...args)
          field.component[1]?.onChange?.(...args)
        }
      : field.component[1]?.onChange
    const onFocus = !isVoidField(field)
      ? (...args: any[]) => {
          field.onFocus(...args)
          field.component[1]?.onFocus?.(...args)
        }
      : field.component[1]?.onFocus
    const onBlur = !isVoidField(field)
      ? (...args: any[]) => {
          field.onBlur(...args)
          field.component[1]?.onBlur?.(...args)
        }
      : field.component[1]?.onBlur
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
    return React.createElement(
      field.component[0],
      {
        disabled,
        readOnly,
        ...field.component[1],
        style: {
          ...field.component[1]?.style,
        },
        value,
        onChange,
        onFocus,
        onBlur,
      },
      children
    )
  }

  return renderDecorator(renderComponent())
}

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal, {
  forwardRef: true,
})
