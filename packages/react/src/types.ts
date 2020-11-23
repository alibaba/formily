import React from 'react'

type IReactComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IFormProps<Component extends IReactComponent> = Omit<
  Formily.ICreateFormOptions,
  'values' | 'initialValues'
> & {
  form?: Formily.Form
  value?: any
  initialValues?: any
  onChange?: (values: any) => void
  onSubmit?: (values: any) => Promise<any> | void
  component?: Component
} & Omit<React.ComponentProps<Component>, 'component' | 'onSubmit'>
