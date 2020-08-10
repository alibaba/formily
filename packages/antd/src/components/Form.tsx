import React, { useRef, useMemo } from 'react'
import { Form as AntdForm } from 'antd'
import { InternalForm } from '@formily/react-schema-renderer'
import { normalizeCol, autoScrollInValidateFailed, isAntdV4,log } from '../shared'
import { FormItemDeepProvider } from '../context'
import { IAntdFormProps } from '../types'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@formily/react-shared-components'

export const Form: React.FC<IAntdFormProps &
  PreviewTextConfigProps> = props => {
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
    previewPlaceholder,
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
          if (e && e.stopPropagation) e.stopPropagation()
          form.submit().catch(e => log.warn(e))
        }
        const onReset = () => {
          form.reset({ validate: false, forceClear: false })
        }
        return (
          <PreviewText.ConfigProvider value={props}>
            <FormItemDeepProvider {...props}>
              <div ref={formRef}>
                <AntdForm
                  {...rest}
                  component={useMemo(() => {
                    if (isAntdV4) {
                      return props => {
                        return React.createElement('form', {
                          ...props,
                          onSubmit,
                          onReset
                        })
                      }
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
          </PreviewText.ConfigProvider>
        )
      }}
    </InternalForm>
  )
}
