import React, { useMemo } from 'react'
import { FormProvider } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { ConfigProvider } from '@alifd/next'
import { getValidateLocaleIOSCode, setValidateLanguage } from '@formily/core'

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
  // @ts-ignore
  const lang = ConfigProvider.getContext()?.locale?.momentLocale
  useMemo(() => {
    if (getValidateLocaleIOSCode(lang)) {
      setValidateLanguage(lang)
    }
  }, [lang])

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
