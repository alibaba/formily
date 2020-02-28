import React, { useRef, useMemo } from 'react'
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
    onChange,
    onSubmit,
    form,
    useDirty,
    onValidateFailed,
    editable,
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
        const onSubmit = e => {
          if (e && e.preventDefault) e.preventDefault()
          form.submit().catch(e => console.warn(e))
        }
        const onReset: =() => {
          form.reset({ validate: false, forceClear: false })
        }
        return (
          <FormItemDeepProvider {...props}>
            <div ref={formRef}>
              <AntdForm
                {...rest}
                component={useMemo(() => {
                  return props =>{
                    return React.createElement('form', {
                      ...props,
                      onSubmit,
                      onReset
                    })
                  }
                }, [])}
                onSubmit={onSubmit}
                onReset={onReset}
                labelCol={normalizeCol(props.labelCol)}
                wrapperCol={normalizeCol(props.wrapperCol)}
                layout={inline ? 'inline' : props.layout}
              />
            </div>
          </FormItemDeepProvider>
        )
      }}
    </InternalForm>
  )
}
