import React from 'react'
import { Form as FormType, IFormFeedback } from '@formily/core'
import { useForm, FormProvider, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
export interface FormProps extends IFormLayoutProps {
  form?: FormType
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
  const top = useForm()
  const renderContent = (form: FormType) => (
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
  )
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}

Form.defaultProps = {
  component: 'form',
}

export default Form
