import React from 'react'
import { FormSpy, LifeCycleTypes } from '@uform/react-schema-renderer'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { ISubmitProps, IResetProps } from '../types'

export const TextButton: React.FC<ButtonProps> = props => (
  <Button type="link" {...props} />
)

export const CircleButton: React.FC<ButtonProps> = props => {
  const hasText = String(props.className || '').indexOf('has-text') > -1
  return (
    <Button
      type={hasText ? 'link' : undefined}
      shape={hasText ? undefined : 'circle'}
      {...props}
    />
  )
}

export const Submit = ({ showLoading, onSubmit, ...props }: ISubmitProps) => {
  return (
    <FormSpy
      selector={[
        LifeCycleTypes.ON_FORM_SUBMIT_START,
        LifeCycleTypes.ON_FORM_SUBMIT_END
      ]}
      reducer={(state, action) => {
        switch (action.type) {
          case LifeCycleTypes.ON_FORM_SUBMIT_START:
            return {
              ...state,
              submitting: true
            }
          case LifeCycleTypes.ON_FORM_SUBMIT_END:
            return {
              ...state,
              submitting: false
            }
          default:
            return state
        }
      }}
    >
      {({ state, form }) => {
        return (
          <Button
            type="primary"
            onClick={() => form.submit(onSubmit)}
            disabled={showLoading ? state.submitting : undefined}
            {...props}
            loading={showLoading ? state.submitting : undefined}
          >
            {props.children || '提交'}
          </Button>
        )
      }}
    </FormSpy>
  )
}

Submit.defaultProps = {
  showLoading: true
}

export const Reset: React.FC<IResetProps> = ({
  children,
  forceClear,
  validate,
  ...props
}) => {
  return (
    <FormSpy selector={[]}>
      {({ form }) => {
        return (
          <Button
            {...props}
            onClick={() => form.reset({ forceClear, validate })}
          >
            {children || '重置'}
          </Button>
        )
      }}
    </FormSpy>
  )
}
