import React from 'react'
import { FormSpy, LifeCycleTypes, createVirtualBox } from '@uform/react-schema-renderer'
import { Button } from '@alifd/next'
import { ButtonProps } from '@alifd/next/types/button'
import { ISubmitProps, IResetProps } from '../types'
import styled from 'styled-components'

export const TextButton: React.FC<ButtonProps> = props => (
  <Button {...props} text />
)

export const CircleButton = styled(props => {
  return (
    <Button {...props} className={`circle-btn ${props.className}`}>
      {props.children}
    </Button>
  )
})<ButtonProps>`
  border-radius: 50% !important;
  padding: 0 !important;
  min-width: 28px;
  &.next-large {
    min-width: 40px;
  }
  &.next-small {
    min-width: 20px;
  }
  &.has-text {
    .next-icon {
      margin-right: 5px;
    }
    background: none !important;
    border: none !important;
  }
`

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
            onClick={async() => {
              try {
                await form.submit(onSubmit)
              } catch (e) {
                // do nothing...
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
            onClick={async() => {
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

createVirtualBox<IResetProps>('reset', Reset)
createVirtualBox<ButtonProps>('text-button', TextButton)
createVirtualBox<ISubmitProps>('submit', Submit)
createVirtualBox<ButtonProps>('circle-button', CircleButton)
