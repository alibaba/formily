import React from 'react'
import { FormProvider } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'

export interface FormProps
  extends Formily.React.Types.IProviderProps,
    IFormLayoutProps {
  form: Formily.Core.Models.Form
  component?: Formily.React.Types.JSXComponent
  onAutoSubmit?: (values: any) => any
}

export const Form: React.FC<FormProps> = ({
  form,
  component,
  onAutoSubmit,
  ...props
}) => {
  return (
    <FormProvider form={form}>
      <FormLayout {...props}>
        {React.createElement(
          component,
          {
            onSubmit(e: React.FormEvent) {
              e?.stopPropagation?.()
              e?.preventDefault?.()
              form.submit(onAutoSubmit)
            },
          },
          props.children
        )}
      </FormLayout>
    </FormProvider>
  )
}

Form.defaultProps = {
  component: 'form',
}

export default Form
