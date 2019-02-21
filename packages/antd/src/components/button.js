import React from 'react'
import { FormConsumer } from '@uform/react'
import { Button } from 'antd'

export const Submit = props => {
  return (
    <FormConsumer>
      {({ status, schema }) => {
        return (
          <Button
            type='primary'
            htmlType='submit'
            {...props}
            loading={status === 'submitting'}
          >
            {props.children || '提交'}
          </Button>
        )
      }}
    </FormConsumer>
  )
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
