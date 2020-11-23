import React from 'react'
import { FormContext } from '../context'
import { useForm } from '../hooks'
import { IFormProps } from '../types'

export function Form<
  Component extends
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
>(props: React.PropsWithChildren<IFormProps<Component>>) {
  const form = useForm(props)
  const Form = props.component as 'form'
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
