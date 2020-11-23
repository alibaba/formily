import { useContext, useMemo } from 'react'
import { FormContext } from '../context'
import { createForm, onFormValuesChange } from '@formily/core'
import { IFormProps } from '../types'
import { toJS } from 'mobx'

export const useForm = (props?: IFormProps<any>, deps: any[] = []) => {
  const ctx = useContext(FormContext)
  return useMemo(() => {
    if (props.form) return props.form
    if (ctx) return ctx
    return createForm({
      ...props,
      values: props.value,
      initialValues: props.initialValues,
      effects: form => {
        onFormValuesChange(() => {
          if (props.onChange) {
            props.onChange(toJS(form.values))
          }
        })
        if (props.effects) {
          props.effects(form)
        }
      }
    })
  }, deps)
}
