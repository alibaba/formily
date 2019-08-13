import React from 'react'
import { FormConsumer } from '@uform/react'
import { Button } from 'antd'
import { ISubmitProps } from '../type'

export const Submit = ({ showLoading, ...props }: ISubmitProps) => {
  return (
    <FormConsumer selector={['submitting', 'submitted']}>
      {({ status }) => {
        return (
          <Button
            type={'primary'}
            htmlType={'submit'}
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

export const Reset: React.FC<Omit<ISubmitProps, 'showLoading'>> = props => {
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
