import React, { useMemo } from 'react'
import { IDesignerProps, GlobalRegistry } from '@designable/core'
import { createForm } from '@formily/core'
import { Form } from '@formily/antd'
import { usePrefix } from '@designable/react'
import { Form as FormPropsSchema } from '../../schemas'
import './styles.less'

export interface IDesignableFormProps extends IDesignerProps {
  name?: string
  component?: React.JSXElementConstructor<unknown>
}

export const createDesignableForm = (options: IDesignableFormProps = {}) => {
  const realOptions: IDesignableFormProps = {
    name: 'DesignableForm',
    component: Form,
    droppable: true,
    draggable: false,
    propsSchema: FormPropsSchema,
    ...options,
    defaultProps: {
      labelCol: 6,
      wrapperCol: 12,
      ...options.defaultProps,
    },
  }

  const FormComponent = realOptions.component || Form

  const DesignableForm: React.FC = (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormComponent {...props} className={prefix} form={form}>
        {props.children}
      </FormComponent>
    )
  }

  realOptions.title = `components.${realOptions.name}`

  GlobalRegistry.registerDesignerProps({
    [realOptions.name]: realOptions,
  })

  return DesignableForm
}
