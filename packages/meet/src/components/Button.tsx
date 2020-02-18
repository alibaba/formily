import React, { createElement } from 'react'
import { FormSpy, LifeCycleTypes, createVirtualBox } from '@formily/react-schema-renderer'
import { Button } from '@alifd/meet'
import { ButtonProps } from '@rax-ui/button';
import { ISubmitProps, IResetProps } from '../types'

const checkChildren = (children: any) => {
  if (!children) return false;
  if (Array.isArray(children) && !children.length) return false;
  return true;
}


export const TextButton: React.FC<ButtonProps> = createVirtualBox<any>(
  'textButton',
  props => (<Button {...props} text />),
)

export const Submit = createVirtualBox<any>(
  'submit',
  ({ showLoading, onSubmit, children, style, ...props }: ISubmitProps) => {
    const existChildren = checkChildren(children);
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
              style={style}
              onClick={() => form.submit(onSubmit)}
              disabled={showLoading ? state.submitting : undefined}
              {...props}
              loading={showLoading ? state.submitting : undefined}
            >
              {existChildren ? children : '提交'}
            </Button>
          )
        }}
      </FormSpy>
    )
  }
)

Submit.defaultProps = {
  showLoading: true
}

export const Reset: React.FC<IResetProps> = createVirtualBox<any>(
  'reset',
  ({
    children,
    forceClear,
    validate,
    style,
    ...props
  }) => {
    const existChildren = checkChildren(children);
    return (
      <FormSpy selector={[]}>
        {({ form }) => {
          return (
            <Button
              {...props}
              style={style}
              onClick={() => form.reset({ forceClear, validate })}
            >
              {existChildren ? children : '重置'}
            </Button>
          )
        }}
      </FormSpy>
    )
  },
)
