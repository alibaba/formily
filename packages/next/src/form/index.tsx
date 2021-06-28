import React, { useMemo } from 'react'
import { FormProvider } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { ConfigProvider } from '@alifd/next'
import { getValidateLocaleIOSCode, setValidateLanguage } from '@formily/core'
import { PreviewText } from '../preview-text'
export interface FormProps
  extends Formily.React.Types.IProviderProps,
    IFormLayoutProps {
  form: Formily.Core.Models.Form
  component?: Formily.React.Types.JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: Formily.Core.Types.IFormFeedback[]) => void
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
  const lang = (ConfigProvider as any).getContext()?.locale?.momentLocale
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
