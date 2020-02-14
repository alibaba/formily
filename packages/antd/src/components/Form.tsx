import React, { useRef } from 'react'
import { Form as AntdForm } from 'antd'
import { InternalForm } from '@formily/react-schema-renderer'
import { normalizeCol, autoScrollInValidateFailed } from '../shared'
import { FormItemDeepProvider } from '../context'
import { IAntdFormProps } from '../types'

export const Form: React.FC<IAntdFormProps> = ({ inline, ...props }) => {
  const formRef = useRef<HTMLDivElement>()
  return (
    <InternalForm
      {...props}
      onValidateFailed={result => {
        if (props.onValidateFailed) {
          props.onValidateFailed(result)
        }
        autoScrollInValidateFailed(formRef)
      }}
    >
      {form => {
        return (
          <FormItemDeepProvider {...props}>
            <div ref={formRef}>
              <AntdForm
                {...props}
                labelCol={normalizeCol(props.labelCol)}
                wrapperCol={normalizeCol(props.wrapperCol)}
                layout={inline ? 'inline' : props.layout}
                form={undefined}
                onSubmit={e => {
                  if (e && e.preventDefault) e.preventDefault()
                  form.submit().catch(e => console.warn(e))
                }}
                onReset={() => {
                  form.reset({ validate: false, forceClear: false })
                }}
              />
            </div>
          </FormItemDeepProvider>
        )
      }}
    </InternalForm>
  )
}
