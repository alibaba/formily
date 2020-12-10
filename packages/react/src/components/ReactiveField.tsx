import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { isFn } from '@formily/shared'
import { isVoidField } from '@formily/core'

interface IReactiveFieldProps {
  field: Formily.Core.Types.GeneralField
  children?:
    | ((
        field: Formily.Core.Types.GeneralField,
        form: Formily.Core.Models.Form
      ) => React.ReactChild)
    | React.ReactNode
}

const ReactiveInternal: React.FC<IReactiveFieldProps> = props => {
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
  if (field.display !== 'visibility') return null

  const renderDecorator = (children: React.ReactNode) => {
    if (!field?.decorator?.[0]) return <Fragment>{children}</Fragment>
    return React.createElement(
      field.decorator[0],
      field.decorator[1] || {},
      children
    )
  }

  const renderComponent = () => {
    if (!field?.component?.[0]) return <Fragment>{children}</Fragment>
    const value = !isVoidField(field) && field.value
    const onChange = !isVoidField(field) && field.onInput
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
    return React.createElement(
      field.component[0],
      { ...field.component[1], value, onChange, disabled, readOnly },
      children
    )
  }

  return renderDecorator(renderComponent())
}

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal, {
  forwardRef: true
})
