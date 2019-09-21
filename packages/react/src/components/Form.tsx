import React, { useRef } from 'react'
import { isFn } from '@uform/shared'
import { useForm } from '../hooks/useForm'
import { createActions } from 'react-eva'
import FormContext from '../context'
import { IFormProps, IFormActions, IFormAsyncActions } from '../types'
import { FormEffectHooks } from '../shared'

export const createFormActions = (): IFormActions =>
  createActions(
    'submit',
    'reset',
    'validate',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'notify',
    'setFieldValue',
    'getFieldValue',
    'setFieldInitialValue',
    'getFieldInitialValue'
  ) as IFormActions

export const createAsyncFormActions = (): IFormAsyncActions =>
  createActions(
    'submit',
    'reset',
    'validate',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'notify',
    'setFieldValue',
    'getFieldValue',
    'setFieldInitialValue',
    'getFieldInitialValue'
  ) as IFormAsyncActions

export const Form: React.FunctionComponent<IFormProps> = (props = {}) => {
  const actionsRef = useRef<any>(null)
  actionsRef.current =
    actionsRef.current || props.actions || createFormActions()
  const form = useForm({
    ...props,
    actions: actionsRef.current
  })
  return (
    <FormContext.Provider value={form}>
      {isFn(props.children) ? props.children(form) : props.children}
    </FormContext.Provider>
  )
}

Form.displayName = 'ReactInternalForm'

export { FormEffectHooks }
