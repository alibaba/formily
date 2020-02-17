import React, { useRef } from 'react'
import { Form as AntdForm } from 'antd'
import { InternalForm } from '@formily/react-schema-renderer'
import { normalizeCol, autoScrollInValidateFailed } from '../shared'
import { FormItemDeepProvider } from '../context'
import { IAntdFormProps } from '../types'

export const Form: React.FC<IAntdFormProps> = props => {
  const {
    inline,
    effects,
    actions,
    initialValues,
    value,
    defaultValue,
    form,
    useDirty,
    onValidateFailed,
    validateFirst,
    ...rest
  } = props
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
                {...rest}
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
