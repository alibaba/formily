import React, { useMemo } from 'react'
import { FormProvider, IProviderProps, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { ConfigProvider } from '@alifd/next'
import {
  getValidateLocaleIOSCode,
  setValidateLanguage,
  Form as FormType,
  IFormFeedback,
} from '@formily/core'
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
  const lang =
    (ConfigProvider as any).getContext()?.locale?.momentLocale ?? 'zh-CN'
  useMemo(() => {
    const validateLanguage = getValidateLocaleIOSCode(lang)
    setValidateLanguage(validateLanguage)
  }, [lang])

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
