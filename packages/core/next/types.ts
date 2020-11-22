import { Form, IFormProps } from './models/Form'
export type FunctionComponent = (...args: any[]) => any

export interface ICreateFormOptions extends IFormProps {
  effects?: (form: Form) => void
}
