import { IFormOptions, IFormPayload, ISchema, IField } from '@uform/types'
import { Form } from '@uform/core'
import { IBroadcast } from '@uform/utils'

export interface IEventTargetOption {
  selected: boolean
  value: any
}

export interface IEnhanceSchema extends ISchema {
  renderChildren?: React.ReactElement
}

export interface IFieldProps
  extends Omit<IField, 'editable'>,
    IStateFieldProps {
  state?: string
  size?: string
  children?: React.ReactNode
  schema: IEnhanceSchema
  getOrderProperties: (schema?: ISchema) => any
  renderField: (key, addReactKey?: boolean) => React.ReactElement
  editable: boolean | ((name: string) => boolean)
}

export interface IStateFieldProps {
  name: string
  schema: ISchema
  path: string[]
  schemaPath: any
  locale: { [key: string]: any }
  getSchema: (path: string) => ISchema
  broadcast: IBroadcast
  form: Form
  // TODO mutators 文件应该暴露出来 interface
  mutators?: any
}

export interface IStateFieldState {
  value?: any
  props?: any
  errors?: any
  visible?: boolean
  display?: boolean
  loading?: boolean
  editable?: boolean
  required?: boolean
}

export interface ISchemaFormProps<V = any> extends IFormOptions<V> {
  className?: string
  children?: React.ReactNode
  value?: V
  onChange?: (payload: IFormPayload) => void
}

export interface IStateFormProps extends ISchemaFormProps {
  broadcast: IBroadcast

  // eva
  implementActions: (actions: object) => object
  dispatch: (type: string, ...args: any) => void
  subscription: () => void

  // ConfigProvider
  locale: { [key: string]: any }
}
