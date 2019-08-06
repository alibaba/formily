import React from 'react'
import { FormConsumer } from '@uform/react'
import { Button } from '@alifd/next'
import { ButtonProps } from '@alifd/next/types/button'

export interface ISubmitProps extends Omit<ButtonProps, 'loading'> {
  showLoading?: boolean
}

export const Submit = ({ showLoading, ...props }: ISubmitProps) => {
  return (
    <FormConsumer selector={['submitting', 'submitted']}>
      {({ status }) => {
        return (
          <Button
            type="primary"
            htmlType="submit"
            disabled={showLoading ? status === 'submitting' : undefined}
            {...props}
            loading={showLoading ? status === 'submitting' : undefined}
          >
            {props.children || '提交'}
          </Button>
        )
      }}
    </FormConsumer>
  )
}

Submit.defaultProps = {
  showLoading: true
}

export const Reset = (props: ButtonProps) => {
  return (
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
}
