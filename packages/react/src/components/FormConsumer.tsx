import React from 'react'
import { isFn, deprecate } from '@uform/shared'
import { FormSpy } from './FormSpy'
import { IForm, LifeCycleTypes } from '@uform/core'
import { IFormConsumerProps, IFormConsumerAPI } from '../types'

const transformStatus = (type: string) => {
  switch (type) {
    case LifeCycleTypes.ON_FORM_INIT:
      return 'initialize'
    case LifeCycleTypes.ON_FORM_SUBMIT_START:
      return 'submitting'
    case LifeCycleTypes.ON_FORM_SUBMIT_END:
      return 'submitted'
    case LifeCycleTypes.ON_FORM_VALIDATE_START:
      return 'validating'
    case LifeCycleTypes.ON_FORM_VALIDATE_END:
      return 'validated'
    default:
      return type
  }
}

const transformFormAPI = (api: IForm, type: string): IFormConsumerAPI => {
  deprecate('FormConsumer', 'Please use FormSpy Component.')
  return {
    status: transformStatus(type),
    state: api.getFormState(),
    submit: api.submit,
    reset: api.reset
  }
}

export const FormConsumer: React.FunctionComponent<
  IFormConsumerProps
> = props => {

  return (
    <FormSpy {...props}>
      {({ form, type }) => {
        return isFn(props.children)
          ? props.children(transformFormAPI(form, type))
          : props.children
      }}
    </FormSpy>
  )
}
