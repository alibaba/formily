import React from 'react'
import { FormConsumer, IUseFormState } from '@uform/react'
import { Button } from '@alifd/next'
import { ISubmitProps } from '../type'

export const Submit = ({ showLoading, ...props }: ISubmitProps) => (
  <FormConsumer selector={['submitStarted', 'submitting', 'submitted']}>
    {({ status }: IUseFormState) => (
      <Button
        type="primary"
        htmlType="submit"
        disabled={
          showLoading
            ? ['submitStarted', 'submitting'].includes(status)
            : undefined
        }
        {...props}
        loading={showLoading ? status === 'submitting' : undefined}
      >
        {props.children || '提交'}
      </Button>
    )}
  </FormConsumer>
)

export const Reset: React.FC<Omit<ISubmitProps, 'showLoading'>> = props => (
  <FormConsumer>
    {({ reset }) => {
      return (
        <Button {...props} onClick={reset}>
          {props.children || '重置'}
        </Button>
      )
    }}
  </FormConsumer>
)
