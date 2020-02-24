import React, { useRef } from 'react'
import { isFn, deprecate } from '@formily/shared'
import { FormSpy } from './FormSpy'
import { IForm, LifeCycleTypes } from '@formily/core'
import { IFormConsumerProps, IFormConsumerAPI } from '../types'

const transformStatus = (type: string, ref: any) => {
  switch (type) {
    case LifeCycleTypes.ON_FORM_INIT:
      return 'initialize'
    case LifeCycleTypes.ON_FORM_SUBMIT_START:
      ref.current.submitting = true
      return 'submitting'
    case LifeCycleTypes.ON_FORM_SUBMIT_END:
      ref.current.submitting = false
      return 'submitted'
    default:
      return ref.current.submitting ? 'submitting' : type
  }
}

const transformFormAPI = (
  api: IForm,
  type: string,
  ref: any
): IFormConsumerAPI => {
  deprecate('FormConsumer', 'Please use FormSpy Component.')
  return {
    status: transformStatus(type, ref),
    state: api.getFormState(),
    submit: api.submit,
    reset: api.reset
  }
}

export const FormConsumer: React.FunctionComponent<IFormConsumerProps> = props => {
  const ref = useRef({})
  return (
    <FormSpy {...props}>
      {({ form, type }) => {
        if (!form) return <React.Fragment />
        return isFn(props.children)
          ? props.children(transformFormAPI(form, type, ref))
          : props.children
      }}
    </FormSpy>
  )
}
