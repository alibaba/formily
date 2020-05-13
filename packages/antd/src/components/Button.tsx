import React from 'react'
import { FormSpy, LifeCycleTypes } from '@formily/react-schema-renderer'
import { Button } from 'antd'
import { ISubmitProps, IResetProps } from '../types'

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
            onClick={e => {
              if (props.htmlType !== 'submit') {
                form.submit(onSubmit)
              }
              if (props.onClick) {
                props.onClick(e)
              }
            }}
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
  showLoading: true,
  type: 'primary',
  htmlType: 'submit'
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
