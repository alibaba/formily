import { IFormOptions, IFormPayload, ISchema, IField } from '@uform/types'
import { Form } from '@uform/core'
import { IBroadcast } from '@uform/utils'

export interface FieldProps extends IField, StateFieldProps {
  children?: React.ReactNode
  schema: ISchema
  getOrderProperties: Function
}

export interface StateFieldProps {
  name: string
  schema: ISchema
  path: string[]
  schemaPath: any
  locale: Object
  getSchema: Function
  form: Form
}

export interface StateFieldState {
  value?: any
  props?: any
  errors?: any
  visible?: boolean
  loading?: boolean
  editable?: boolean
  required?: boolean
}

export interface SchemaFormProps extends IFormOptions {
  className?: string
  children?: React.ReactNode
  value?: any
  onChange?: (payload: IFormPayload) => void
}

export interface StateFormProps extends SchemaFormProps {
  broadcast: IBroadcast

  // eva
  implementActions: (actions: Object) => Object
  dispatch: (type: string, ...args: any) => void
  subscription: Function

  // ConfigProvider
  locale: Object
}
