import React from 'react'
import { FormSpy, LifeCycleTypes } from '@formily/react-schema-renderer'
import { Button } from '@alifd/next'
import { ISubmitProps, IResetProps } from '../types'

export const Submit = ({ showLoading, onSubmit, ...props }: ISubmitProps) => {
  return (
    <FormSpy
      selector={[
        LifeCycleTypes.ON_FORM_MOUNT,
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
              if (onSubmit) {
                form.submit(onSubmit)
              }
              if (props.onClick) {
                props.onClick(e)
              }
            }}
            {...props}
            htmlType={onSubmit ? 'button' : 'submit'}
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
            onClick={async () => {
              try {
                await form.reset({ forceClear, validate })
              } catch (e) {
                // do nothing...
              }
            }}
          >
            {children || '重置'}
          </Button>
        )
      }}
    </FormSpy>
  )
}
