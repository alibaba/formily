import React, { Fragment, useContext } from 'react'
import { toJS } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { FormPath, isFn } from '@formily/shared'
import { isVoidField, GeneralField, Form } from '@formily/core'
import { SchemaComponentsContext } from '../shared'
import { RenderPropsChildren } from '../types'
import { isStr } from 'packages/path/src/shared'
interface IReactiveFieldProps {
  field: GeneralField
  children?: RenderPropsChildren<GeneralField>
}

const mergeChildren = (
  children: RenderPropsChildren<GeneralField>,
  content: React.ReactNode
) => {
  if (!children && !content) return
  if (isFn(children)) return
  return (
    <Fragment>
      {children}
      {content}
    </Fragment>
  )
}

const renderChildren = (
  children: RenderPropsChildren<GeneralField>,
  field?: GeneralField,
  form?: Form
) => (isFn(children) ? children(field, form) : children)

const ReactiveInternal: React.FC<IReactiveFieldProps> = (props) => {
  const components = useContext(SchemaComponentsContext)
  if (!props.field) {
    return <Fragment>{renderChildren(props.children)}</Fragment>
  }
  const field = props.field
  const content = mergeChildren(
    renderChildren(props.children, field, field.form),
    field.content ?? field.componentProps.children
  )
  if (field.display !== 'visible') return null

  const renderDecorator = (children: React.ReactNode) => {
    if (!field.decoratorType) {
      return <Fragment>{children}</Fragment>
    }
    const finalComponent = !isStr(field.decoratorType)
      ? field.decoratorType
      : FormPath.getIn(components, field.decoratorType)

    return React.createElement(
      finalComponent,
      toJS(field.decoratorProps),
      children
    )
  }

  const renderComponent = () => {
    if (!field.componentType) return content
    const value = !isVoidField(field) ? field.value : undefined
    const onChange = !isVoidField(field)
      ? (...args: any[]) => {
          field.onInput(...args)
          field.componentProps?.onChange?.(...args)
        }
      : field.componentProps?.onChange
    const onFocus = !isVoidField(field)
      ? (...args: any[]) => {
          field.onFocus(...args)
          field.componentProps?.onFocus?.(...args)
        }
      : field.componentProps?.onFocus
    const onBlur = !isVoidField(field)
      ? (...args: any[]) => {
          field.onBlur(...args)
          field.componentProps?.onBlur?.(...args)
        }
      : field.componentProps?.onBlur
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
    const finalComponent = !isStr(field.componentType)
      ? field.componentType
      : FormPath.getIn(components, field.componentType)
    return React.createElement(
      finalComponent,
      {
        disabled,
        readOnly,
        ...toJS(field.componentProps),
        value,
        onChange,
        onFocus,
        onBlur,
      },
      content
    )
  }

  return renderDecorator(renderComponent())
}

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal, {
  forwardRef: true,
})
