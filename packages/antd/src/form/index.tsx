import React from 'react'
import { Form as FormType, IFormFeedback } from '@formily/core'
import { FormProvider, IProviderProps, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
export interface FormProps extends IProviderProps, IFormLayoutProps {
  form: FormType
  component?: JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  previewTextPlaceholder?: React.ReactNode
}

export const Form: React.FC<FormProps> = ({
  form,
  component,
  onAutoSubmit,
  onAutoSubmitFailed,
  previewTextPlaceholder,
  ...props
}) => {
  return (
    <FormProvider form={form}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <FormLayout {...props}>
          {React.createElement(
            component,
            {
              onSubmit(e: React.FormEvent) {
                e?.stopPropagation?.()
                e?.preventDefault?.()
                form.submit(onAutoSubmit).catch(onAutoSubmitFailed)
              },
            },
            props.children
          )}
        </FormLayout>
      </PreviewText.Placeholder>
    </FormProvider>
  )
}

Form.defaultProps = {
  component: 'form',
}

export default Form
