import React from 'react'
import { FormConsumer } from '@uform/react'
import { Button } from '@alifd/next'

export const Submit = ({ showLoading, ...props }) => {
  return (
    <FormConsumer>
      {({ status, schema }) => {
        return (
          <Button
            type='primary'
            htmlType='submit'
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

export const Reset = props => {
  return (
    <FormConsumer>
      {({ status, reset }) => {
        return (
          <Button {...props} onClick={reset}>
            {props.children || '重置'}
          </Button>
        )
      }}
    </FormConsumer>
  )
}
