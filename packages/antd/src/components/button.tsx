import React, { useState, useEffect } from 'react'
import { FormConsumer, IUseFormState } from '@uform/react'
import { isFn } from '@uform/utils'
import { Button } from 'antd'
import { ISubmitProps } from '../type'

interface ISubmitComponentProps extends ISubmitProps {
  useFormState: IUseFormState
}

const SUBMIT_START = 'submitStart'

const SubmitComponent = ({
  showLoading,
  useFormState: { submit, status },
  ...props
}: ISubmitComponentProps) => {
  /**
   * @see https://github.com/alibaba/uform/blob/4009d7834e883bf2d7cb5aef2c4bcc7981924f6a/packages/core/src/form.ts#L543
   *
   * 因为 submitting 的状态是在校验完成之后才生成的
   * 而如果校验耗时较长就会导致 submitting 的生成延迟
   * 而在这之前，Submit 组件就一直处于可以点击的状态，容易造成重复提交
   */
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    setSubmitStatus(status)
  }, [status])

  const handleSubmit = () => {
    // 新增 submitStart 状态用于标识 Submit 被初始点击
    setSubmitStatus(SUBMIT_START)

    if (isFn(submit)) {
      submit()
    }
  }

  const disabledState = showLoading
    ? [SUBMIT_START, 'submitting'].includes(submitStatus)
    : undefined

  return (
    <Button
      type="primary"
      disabled={disabledState}
      {...props}
      loading={showLoading ? submitStatus === 'submitting' : undefined}
      onClick={handleSubmit}
    >
      {props.children || '提交'}
    </Button>
  )
}

export const Submit = (props: ISubmitProps) => (
  <FormConsumer selector={['submitting', 'submitted']}>
    {(useFormState: IUseFormState) => (
      <SubmitComponent {...{ useFormState, ...props }} />
    )}
  </FormConsumer>
)

export const Reset = props => {
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
