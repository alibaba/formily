import React from 'react'

export interface IFormProps
  extends Omit<Formily.ICreateFormOptions, 'values' | 'initialValues'> {
  form?: Formily.Form
  value?: any
  initialValues?: any
  onChange?: (values: any) => void
  onSubmit?: (values: any) => Promise<any> | void
  component?:
    | string
    | React.FunctionComponent<React.HTMLAttributes<HTMLFormElement>>
    | React.ComponentClass<React.HTMLAttributes<HTMLFormElement>>
}
