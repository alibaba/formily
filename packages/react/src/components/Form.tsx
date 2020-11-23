import React from 'react'
import { FormContext } from '../context'
import { useForm } from '../hooks'
import { IFormProps } from '../types'

export const Form: React.FC<IFormProps> = props => {
  const form = useForm(props)
  const Form = props.component
  return (
    <FormContext.Provider value={form}>
      <Form
        onSubmit={e => {
          e?.preventDefault()
          form.submit(props.onSubmit)
        }}
      >
        {props.children}
      </Form>
    </FormContext.Provider>
  )
}
Form.defaultProps = {
  component: 'form',
  middlewares: []
}
