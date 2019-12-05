import React from 'react'
import { FormItemProvider, useFormItem } from '../compat/context'
import { createVirtualBox } from '@uform/react-schema-renderer'
import cls from 'classnames'
import { IFormItemTopProps } from '../types'

export const FormLayout = createVirtualBox<IFormItemTopProps>(
  'layout',
  props => {
    const { inline } = useFormItem()
    const isInline = props.inline || inline
    const children =
      isInline || props.className || props.style ? (
        <div
          className={cls(props.className, {
            'ant-form ant-form-inline': isInline
          })}
          style={props.style}
        >
          {props.children}
        </div>
      ) : (
        props.children
      )
    return <FormItemProvider {...props}>{children}</FormItemProvider>
  }
)
