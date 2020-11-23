import { Form } from './models/Form'
export * from './hook'
export * from './hooks'
export const createForm = (options: Formily.ICreateFormOptions) => {
  return new Form(options)
}
