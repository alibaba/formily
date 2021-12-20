import React, { useRef } from 'react'
import { Form as NextForm } from '@alifd/next'
import { InternalForm } from '@formily/react-schema-renderer'
import {
  normalizeCol,
  autoScrollInValidateFailed,
  log,
  isFn,
  cloneChlildren
} from '../shared'
import { FormItemDeepProvider } from '../context'
import { INextFormProps } from '../types'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@formily/react-shared-components'

export const Form: React.FC<INextFormProps &
  PreviewTextConfigProps> = props => {
  const {
    inline,
    effects,
    actions,
    initialValues,
    value,
    onChange,
    onSubmit,
    defaultValue,
    form,
    useDirty,
    onValidateFailed,
    previewPlaceholder,
    validateFirst,
    children,
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
        const renderedChildren = isFn(children)
          ? children(form)
          : cloneChlildren(children)
        return (
          <PreviewText.ConfigProvider value={props}>
            <FormItemDeepProvider {...props}>
              <div ref={formRef}>
                <NextForm
                  {...rest}
                  labelCol={normalizeCol(props.labelCol)}
                  wrapperCol={normalizeCol(props.wrapperCol)}
                  field={false}
                  inline={inline}
                  onSubmit={e => {
                    if (e && e.preventDefault) e.preventDefault()
                    if (e && e.stopPropagation) e.stopPropagation()
                    form.submit().catch(e => log.warn(e))
                  }}
                  onReset={() => {
                    form.reset({ validate: false, forceClear: false })
                  }}
                >
                  {renderedChildren}
                </NextForm>
              </div>
            </FormItemDeepProvider>
          </PreviewText.ConfigProvider>
        )
      }}
    </InternalForm>
  )
}
